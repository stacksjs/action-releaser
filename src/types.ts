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

  /**
   * Path to the Homebrew formula template file
   */
  homebrewFormula: string

  /**
   * Repository to update the Homebrew formula in (format: owner/repo)
   */
  homebrewRepo: string

  /**
   * Branch name in the Homebrew repository to commit to
   */
  homebrewBranch: string

  /**
   * Path in the Homebrew repository where formulas are stored
   */
  homebrewPath: string

  /**
   * Commit message format for Homebrew formula updates
   */
  homebrewCommitFormat: string
}
