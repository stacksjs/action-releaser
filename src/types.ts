export interface ActionInputs {
  /**
   * List of files to attach to the release
   */
  files: string

  /**
   * GitHub token
   */
  token: string

  /**
   * The tag name for the release
   */
  tag: string

  /**
   * Create a draft release
   */
  draft: string

  /**
   * Mark as prerelease
   */
  prerelease: string

  /**
   * Release notes
   */
  note: string
}
