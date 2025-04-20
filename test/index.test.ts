import { beforeEach, describe, expect, it, mock } from 'bun:test'
import * as fs from 'node:fs'

// Now import the run function
import { run } from '../src/index'

// We need to setup mocks before importing the module
const inputValues = {
  files: 'test/fixtures/*.txt',
  token: 'mock-token',
  tag: 'v1.0.0',
  draft: 'false',
  prerelease: 'false',
  note: 'Test release notes',
}

// Create mock functions with proper types
const mockGetInput = mock<(name: string, options?: { required?: boolean }) => string>(
  (name: string) => inputValues[name as keyof typeof inputValues] || '',
)
const mockSetFailed = mock<(message: string) => void>(() => {})
const mockInfo = mock<(message: string) => void>(() => {})
const mockWarning = mock<(message: string) => void>(() => {})

// Mock Octokit methods
const mockGetReleaseByTag = mock<() => Promise<any>>(() =>
  Promise.resolve({ data: { id: 12345 } }),
)
const mockCreateRelease = mock<() => Promise<any>>(() =>
  Promise.resolve({ data: { id: 12345 } }),
)
const mockUploadReleaseAsset = mock<() => Promise<any>>(() =>
  Promise.resolve({}),
)

// Create mock Octokit instance
const mockOctokit = {
  rest: {
    repos: {
      getReleaseByTag: mockGetReleaseByTag,
      createRelease: mockCreateRelease,
      uploadReleaseAsset: mockUploadReleaseAsset,
    },
  },
}

// Mock getOctokit function
const mockGetOctokit = mock<() => typeof mockOctokit>(() => mockOctokit)

// Mock GitHub context
const mockContext = {
  repo: {
    owner: 'testowner',
    repo: 'testrepo',
  },
  ref: 'refs/tags/v1.0.0',
}

// Mock the glob results
const mockGlobResults = ['test/fixtures/file1.txt', 'test/fixtures/file2.txt']
const mockGlobber = {
  glob: mock<() => Promise<string[]>>(() => Promise.resolve(mockGlobResults)),
}
const mockGlobCreate = mock<() => Promise<typeof mockGlobber>>(() => Promise.resolve(mockGlobber))

// Setup mocks before importing the module
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

mock.module('@actions/glob', () => ({
  create: mockGlobCreate,
}))

// Create the test fixtures
const fixturesDir = 'test/fixtures'
if (!fs.existsSync(fixturesDir)) {
  fs.mkdirSync(fixturesDir, { recursive: true })
  fs.writeFileSync(`${fixturesDir}/file1.txt`, 'test content 1')
  fs.writeFileSync(`${fixturesDir}/file2.txt`, 'test content 2')
}

describe('GitHub Asset Releaser', () => {
  beforeEach(() => {
    // Reset all mocks
    mockGetInput.mockClear()
    mockSetFailed.mockClear()
    mockInfo.mockClear()
    mockWarning.mockClear()
    mockGetReleaseByTag.mockClear()
    mockCreateRelease.mockClear()
    mockUploadReleaseAsset.mockClear()
    mockGetOctokit.mockClear()
    mockGlobber.glob.mockClear()
    mockGlobCreate.mockClear()

    // Reset input values to defaults
    inputValues.files = 'test/fixtures/*.txt'
    inputValues.token = 'mock-token'
    inputValues.tag = 'v1.0.0'
    inputValues.draft = 'false'
    inputValues.prerelease = 'false'
    inputValues.note = 'Test release notes'

    // Reset glob results
    mockGlobResults.length = 0
    mockGlobResults.push('test/fixtures/file1.txt', 'test/fixtures/file2.txt')
  })

  it('should create a release when one does not exist', async () => {
    // Setup to simulate release not found
    mockGetReleaseByTag.mockImplementationOnce(() => Promise.reject(new Error('Not found')))

    // Run the action
    await run()

    // Verify a release was created
    expect(mockCreateRelease).toHaveBeenCalled()

    // Verify assets were uploaded
    expect(mockUploadReleaseAsset).toHaveBeenCalledTimes(2)
  })

  it('should use existing release when one already exists', async () => {
    // Make sure we're using the default mock implementation
    mockGetReleaseByTag.mockImplementationOnce(() => Promise.resolve({ data: { id: 12345 } }))

    // Run the action
    await run()

    // Verify a release was not created
    expect(mockCreateRelease).not.toHaveBeenCalled()

    // Verify assets were uploaded
    expect(mockUploadReleaseAsset).toHaveBeenCalledTimes(2)
  })

  it('should handle upload errors gracefully', async () => {
    // Setup first upload to fail, second to succeed
    mockUploadReleaseAsset.mockImplementationOnce(() => Promise.reject(new Error('Upload error')))

    // Run the action
    await run()

    // Verify a warning was logged
    expect(mockWarning).toHaveBeenCalledWith(expect.stringContaining('Failed to upload'))
  })

  it('should handle missing files', async () => {
    // Make the glob return no files
    mockGlobber.glob.mockImplementationOnce(() => Promise.resolve([]))

    // Run the action
    await run()

    // Verify warning was logged
    expect(mockWarning).toHaveBeenCalledWith('No files matched the provided patterns')
  })

  it('should handle missing token', async () => {
    // Set token to empty
    inputValues.token = ''

    // Run the action
    await run()

    // Verify the action failed with appropriate message
    expect(mockSetFailed).toHaveBeenCalledWith('GitHub token is required')
  })
})
