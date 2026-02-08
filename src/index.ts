import type { ActionInputs } from './types'
import * as buffer from 'node:buffer'
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as process from 'node:process'
import * as core from '@actions/core'
import * as github from '@actions/github'
import * as glob from '@actions/glob'

export * from './types'

export async function run(): Promise<void> {
  try {
    // Get inputs
    const inputs: ActionInputs = {
      files: core.getInput('files', { required: false }) || '',
      token: core.getInput('token', { required: false }) || process.env.GITHUB_TOKEN || '',
      tag: core.getInput('tag', { required: false }) || github.context.ref.replace('refs/tags/', ''),
      draft: core.getInput('draft', { required: false }) || 'false',
      prerelease: core.getInput('prerelease', { required: false }) || 'false',
      note: core.getInput('note', { required: false }) || '',
      changelog: core.getInput('changelog', { required: false }) || '',
      homebrewFormula: core.getInput('homebrewFormula', { required: false }) || '',
      homebrewRepo: core.getInput('homebrewRepo', { required: false }) || '',
      homebrewBranch: core.getInput('homebrewBranch', { required: false }) || 'main',
      homebrewPath: core.getInput('homebrewPath', { required: false }) || 'Formula',
      homebrewCommitFormat: core.getInput('homebrewCommitFormat', { required: false }) || 'update: {{ formula }} to {{ version }}',
    }

    // Validate inputs
    if (!inputs.token) {
      throw new Error('GitHub token is required')
    }

    // Parse the file patterns
    const filePatterns = inputs.files.split('\n').map(pattern => pattern.trim()).filter(Boolean)

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

    if (files.length === 0 && filePatterns.length > 0) {
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

      // Extract changelog content if provided
      const releaseBody = inputs.changelog
        ? extractChangelogForVersion(inputs.changelog, inputs.tag) || inputs.note
        : inputs.note

      const { data: newRelease } = await octokit.rest.repos.createRelease({
        owner,
        repo,
        tag_name: inputs.tag,
        name: inputs.tag,
        body: releaseBody,
        draft: inputs.draft === 'true',
        prerelease: inputs.prerelease === 'true',
      })
      releaseId = newRelease.id
      core.info(`Created new release with ID: ${releaseId}`)
    }

    // Upload assets
    const uploadedAssets: { name: string, browser_download_url: string }[] = []
    for (const file of files) {
      const fileName = file.split('/').pop() || file

      try {
        core.info(`Uploading asset: ${file}`)

        const fileContent = fs.readFileSync(file)
        const fileSize = fs.statSync(file).size

        const { data: asset } = await octokit.rest.repos.uploadReleaseAsset({
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

        uploadedAssets.push({
          name: asset.name,
          browser_download_url: asset.browser_download_url,
        })

        core.info(`Successfully uploaded ${fileName}`)
      }
      catch (uploadError) {
        core.warning(`Failed to upload ${fileName}: ${uploadError instanceof Error ? uploadError.message : String(uploadError)}`)
      }
    }

    core.info('Asset upload complete')

    // Handle Homebrew formula update if configured
    if (inputs.homebrewFormula && inputs.homebrewRepo) {
      await updateHomebrewFormula(inputs, uploadedAssets, octokit)
    }
  }
  catch (error) {
    core.setFailed(error instanceof Error ? error.message : String(error))
  }
}

function extractChangelogForVersion(changelogPath: string, version: string): string {
  try {
    if (!changelogPath || !fs.existsSync(changelogPath)) {
      core.warning(`Changelog file not found: ${changelogPath}`)
      return ''
    }

    const content = fs.readFileSync(changelogPath, 'utf8')
    const versionPattern = version.startsWith('v') ? version.substring(1) : version

    // Find the section for this version between [Compare changes] markers
    const lines = content.split('\n')
    let capturing = false
    const result: string[] = []

    for (const line of lines) {
      const lineLower = line.toLowerCase()

      // Start capturing when we find the compare changes link with our version (case-insensitive)
      if (lineLower.includes('[compare changes]') && line.includes(versionPattern)) {
        capturing = true
        result.push(line) // Include the compare changes link
        continue
      }

      // Stop capturing when we hit the next compare changes link
      if (capturing && lineLower.includes('[compare changes]')) {
        break
      }

      if (capturing) {
        result.push(line)
      }
    }

    const extracted = result.join('\n').trim()
    if (extracted) {
      core.info(`Successfully extracted ${extracted.split('\n').length} lines from changelog for version ${version}`)
    }
    else {
      core.warning(`No changelog content found for version ${version}`)
    }

    return extracted
  }
  catch (error) {
    core.warning(`Error extracting changelog: ${error instanceof Error ? error.message : String(error)}`)
    return ''
  }
}

async function updateHomebrewFormula(
  inputs: ActionInputs,
  assets: { name: string, browser_download_url: string }[],
  octokit: ReturnType<typeof github.getOctokit>,
): Promise<void> {
  try {
    core.info('Starting Homebrew formula update...')

    // Parse the homebrew repo string (format: owner/repo)
    const [homebrewOwner, homebrewRepo] = inputs.homebrewRepo.split('/')
    if (!homebrewOwner || !homebrewRepo) {
      throw new Error('Invalid homebrewRepo format. Expected format: owner/repo')
    }

    // Read the formula template
    if (!fs.existsSync(inputs.homebrewFormula)) {
      throw new Error(`Homebrew formula template file not found: ${inputs.homebrewFormula}`)
    }

    let formulaContent = fs.readFileSync(inputs.homebrewFormula, 'utf8')
    const formulaName = path.basename(inputs.homebrewFormula, path.extname(inputs.homebrewFormula))

    // Replace variables in the formula template
    const version = inputs.tag.startsWith('v') ? inputs.tag.substring(1) : inputs.tag

    // Replace version and download URLs in the formula
    formulaContent = formulaContent.replace(/\{\{(\s*)version(\s*)\}\}/g, version)

    // Replace download URLs for each asset
    for (const asset of assets) {
      const placeholder = `{{${asset.name}_url}}`
      if (formulaContent.includes(placeholder)) {
        formulaContent = formulaContent.replace(
          new RegExp(placeholder, 'g'),
          asset.browser_download_url,
        )
      }
    }

    // Try to get the current file SHA (if it exists)
    let fileSha: string | undefined
    try {
      const { data: fileData } = await octokit.rest.repos.getContent({
        owner: homebrewOwner,
        repo: homebrewRepo,
        path: `${inputs.homebrewPath}/${formulaName}.rb`,
        ref: inputs.homebrewBranch,
      })

      if ('sha' in fileData) {
        fileSha = fileData.sha
        core.info(`Found existing formula file with SHA: ${fileSha}`)
      }
    }
    catch (getContentError) {
      core.info(`Formula file does not exist yet, creating a new one: ${getContentError instanceof Error ? getContentError.message : String(getContentError)}`)
    }

    // Create commit message
    const commitMessage = inputs.homebrewCommitFormat
      .replace(/\{\{(\s*)formula(\s*)\}\}/g, formulaName)
      .replace(/\{\{(\s*)version(\s*)\}\}/g, version)

    // Create or update the formula file
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: homebrewOwner,
      repo: homebrewRepo,
      path: `${inputs.homebrewPath}/${formulaName}.rb`,
      message: commitMessage,
      content: buffer.Buffer.from(formulaContent).toString('base64'),
      sha: fileSha,
      branch: inputs.homebrewBranch,
    })

    core.info(`Successfully updated Homebrew formula at ${homebrewOwner}/${homebrewRepo}/${inputs.homebrewPath}/${formulaName}.rb`)
  }
  catch (error) {
    core.warning(`Failed to update Homebrew formula: ${error instanceof Error ? error.message : String(error)}`)
  }
}

// Run the action
run()
