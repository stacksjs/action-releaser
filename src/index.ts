import type { ActionInputs } from './types'
import * as fs from 'node:fs'
import * as process from 'node:process'
import * as core from '@actions/core'
import * as github from '@actions/github'
import * as glob from '@actions/glob'

export * from './types'

export async function run(): Promise<void> {
  try {
    // Get inputs
    const inputs: ActionInputs = {
      files: core.getInput('files', { required: true }),
      token: core.getInput('token', { required: false }) || process.env.GITHUB_TOKEN || '',
      tag: core.getInput('tag', { required: false }) || github.context.ref.replace('refs/tags/', ''),
      draft: core.getInput('draft', { required: false }) || 'false',
      prerelease: core.getInput('prerelease', { required: false }) || 'false',
      note: core.getInput('note', { required: false }) || '',
    }

    // Validate inputs
    if (!inputs.token) {
      throw new Error('GitHub token is required')
    }

    // Parse the file patterns
    const filePatterns = inputs.files.split('\n').map(pattern => pattern.trim()).filter(Boolean)
    if (filePatterns.length === 0) {
      throw new Error('No file patterns provided')
    }

    // Create Octokit client
    const octokit = github.getOctokit(inputs.token)
    const { owner, repo } = github.context.repo

    // Resolve glob patterns to files
    const files: string[] = []
    for (const pattern of filePatterns) {
      const globber = await glob.create(pattern)
      const matches = await globber.glob()
      files.push(...matches)
    }

    if (files.length === 0) {
      core.warning('No files matched the provided patterns')
    }

    // Check if release exists
    let releaseId: number
    try {
      const { data: release } = await octokit.rest.repos.getReleaseByTag({
        owner,
        repo,
        tag: inputs.tag,
      })
      releaseId = release.id
      core.info(`Found existing release with ID: ${releaseId}`)
    }
    catch {
      // Create a new release if it doesn't exist
      core.info(`No existing release found for tag ${inputs.tag}. Creating a new one.`)
      const { data: newRelease } = await octokit.rest.repos.createRelease({
        owner,
        repo,
        tag_name: inputs.tag,
        name: inputs.tag,
        body: inputs.note,
        draft: inputs.draft === 'true',
        prerelease: inputs.prerelease === 'true',
      })
      releaseId = newRelease.id
      core.info(`Created new release with ID: ${releaseId}`)
    }

    // Upload assets
    for (const file of files) {
      const fileName = file.split('/').pop() || file

      try {
        core.info(`Uploading asset: ${file}`)

        const fileContent = fs.readFileSync(file)
        const fileSize = fs.statSync(file).size

        await octokit.rest.repos.uploadReleaseAsset({
          owner,
          repo,
          release_id: releaseId,
          name: fileName,
          data: fileContent as unknown as string,
          headers: {
            'content-type': 'application/octet-stream',
            'content-length': fileSize,
          },
        })

        core.info(`Successfully uploaded ${fileName}`)
      }
      catch (uploadError) {
        core.warning(`Failed to upload ${fileName}: ${uploadError instanceof Error ? uploadError.message : String(uploadError)}`)
      }
    }

    core.info('Asset upload complete')
  }
  catch (error) {
    core.setFailed(error instanceof Error ? error.message : String(error))
  }
}

// Run the action
run()
