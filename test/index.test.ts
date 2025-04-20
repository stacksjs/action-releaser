import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test'
import * as fs from 'node:fs'
import { run } from '../src/index'

// Create mock functions with proper types
const mockGetInput = mock<(name: string, options?: { required?: boolean }) => string>(() => '')
const mockSetFailed = mock<(message: string) => void>(() => {})
const mockInfo = mock<(message: string) => void>(() => {})
const mockWarning = mock<(message: string) => void>(() => {})

// Mock Octokit functions
const mockGetReleaseByTag = mock<() => Promise<any>>(() => Promise.resolve({ data: { id: 12345 } }))
const mockCreateRelease = mock<(params: any) => Promise<any>>(() => Promise.resolve({ data: { id: 12345 } }))
const mockUploadReleaseAsset = mock<(params: any) => Promise<any>>(() => Promise.resolve({}))

// Mock GitHub context
const mockContext = {
  repo: {
    owner: 'testowner',
    repo: 'testrepo',
  },
  ref: 'refs/tags/v1.0.0',
}

// Mock getOctokit
const mockGetOctokit = mock<(token: string) => any>(() => ({
  rest: {
    repos: {
      getReleaseByTag: mockGetReleaseByTag,
      createRelease: mockCreateRelease,
      uploadReleaseAsset: mockUploadReleaseAsset,
    },
  },
}))

// Setup mocks
mock.module('@actions/core', () => ({
  getInput: mockGetInput,
  setFailed: mockSetFailed,
  info: mockInfo,
  warning: mockWarning,
}))

mock.module('@actions/github', () => ({
  context: mockContext,
  getOctokit: mockGetOctokit,
}))

// Mock the glob module
const mockGlobCreate = mock<(pattern: string) => Promise<{ glob: () => Promise<string[]> }>>(async () => ({
  glob: async () => ['test/fixtures/file1.txt', 'test/fixtures/file2.txt'],
}))

mock.module('@actions/glob', () => ({
  create: mockGlobCreate,
}))

describe('GitHub Asset Releaser', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    mockGetInput.mockClear()
    mockSetFailed.mockClear()
    mockInfo.mockClear()
    mockWarning.mockClear()
    mockGetReleaseByTag.mockClear()
    mockCreateRelease.mockClear()
    mockUploadReleaseAsset.mockClear()
    mockGetOctokit.mockClear()
    mockGlobCreate.mockClear()

    // Set up default input values
    mockGetInput.mockImplementation((name: string) => {
      switch (name) {
        case 'files':
          return 'test/fixtures/*.txt'
        case 'token':
          return 'mock-token'
        case 'tag':
          return 'v1.0.0'
        case 'draft':
          return 'false'
        case 'prerelease':
          return 'false'
        case 'note':
          return 'Test release notes'
        default:
          return ''
      }
    })
  })

  it('should create a release when one does not exist', async () => {
    // Setup the mock to throw error when getReleaseByTag is called (simulating release not found)
    mockGetReleaseByTag.mockImplementation(() => Promise.reject(new Error('Not found')))

    // Run the action
    await run()

    // Verify a release was created
    expect(mockCreateRelease).toHaveBeenCalledTimes(1)
    expect(mockCreateRelease).toHaveBeenCalledWith({
      owner: 'testowner',
      repo: 'testrepo',
      tag_name: 'v1.0.0',
      name: 'v1.0.0',
      body: 'Test release notes',
      draft: false,
      prerelease: false,
    })

    // Verify assets were uploaded
    expect(mockUploadReleaseAsset).toHaveBeenCalledTimes(2)
  })

  it('should use existing release when one already exists', async () => {
    // Make sure we're returning a found release and reset mock counts
    mockGetReleaseByTag.mockReset()
    mockGetReleaseByTag.mockResolvedValue({ data: { id: 12345 } })
    mockCreateRelease.mockReset()

    // Run the action
    await run()

    // Verify a release was not created
    expect(mockCreateRelease).not.toHaveBeenCalled()

    // Verify assets were uploaded to existing release
    expect(mockUploadReleaseAsset).toHaveBeenCalledTimes(2)
    expect(mockUploadReleaseAsset).toHaveBeenCalledWith(
      expect.objectContaining({
        owner: 'testowner',
        repo: 'testrepo',
        release_id: 12345,
      }),
    )
  })

  it('should handle upload errors gracefully', async () => {
    // Setup first upload to fail, second to succeed
    mockUploadReleaseAsset.mockReset()
    mockUploadReleaseAsset.mockImplementationOnce(() => Promise.reject(new Error('Upload error')))
    mockUploadReleaseAsset.mockImplementationOnce(() => Promise.resolve({}))

    // Run the action
    await run()

    // Verify a warning was logged
    expect(mockWarning).toHaveBeenCalledWith(expect.stringContaining('Failed to upload'))

    // Verify the action didn't fail completely
    expect(mockSetFailed).not.toHaveBeenCalled()
  })

  it('should handle missing files', async () => {
    // Mock the glob to return no files
    mockGlobCreate.mockReset()
    mockGlobCreate.mockImplementation(async () => ({
      glob: async () => [],
    }))

    // Run the action
    await run()

    // Verify warning was logged
    expect(mockWarning).toHaveBeenCalledWith('No files matched the provided patterns')
  })

  it('should handle missing token', async () => {
    // Mock getInput to return empty token
    mockGetInput.mockReset()
    mockGetInput.mockImplementation((name: string) => {
      if (name === 'token')
        return ''
      if (name === 'files')
        return 'test/fixtures/*.txt'
      return ''
    })

    // Run the action
    await run()

    // Verify the action failed with appropriate message
    expect(mockSetFailed).toHaveBeenCalledWith('GitHub token is required')
  })
})
