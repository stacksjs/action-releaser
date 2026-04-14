# API Reference

Complete reference for action-releaser inputs and configuration.

## Action Inputs

### files

**Required**: No (but recommended)

List of files to attach to the release. Supports glob patterns.

```yaml
files: |
  dist/*.zip
  dist/*.tar.gz
  bin/app-*
```

### token

**Required**: No

GitHub token for authentication. Defaults to `${{ github.token }}`.

```yaml
token: ${{ secrets.GITHUB*TOKEN }}
```

For Homebrew updates to external repositories, use a PAT:

```yaml
token: ${{ secrets.HOMEBREW*TOKEN }}
```

### tag

**Required**: No

The tag name for the release. Defaults to `${{ github.ref*name }}`.

```yaml
tag: v1.2.3
```

### draft

**Required**: No

Create the release as a draft. Defaults to `false`.

```yaml
draft: true
```

### prerelease

**Required**: No

Mark the release as a prerelease. Defaults to `false`.

```yaml
prerelease: true
```

### note

**Required**: No

Release notes / body content.

```yaml
note: |
## What's New

  - Feature 1
  - Feature 2

```

### changelog

**Required**: No

Path to CHANGELOG.md file. If provided, extracts notes for the current version.

```yaml
changelog: ./CHANGELOG.md
```

### homebrewFormula

**Required**: No

Path to the Homebrew formula template file.

```yaml
homebrewFormula: .github/homebrew-formula.rb
```

### homebrewRepo

**Required**: No

Repository to update the Homebrew formula in. Format: `owner/repo`.

```yaml
homebrewRepo: myorg/homebrew-tap
```

### homebrewBranch

**Required**: No

Branch in the Homebrew repository to commit to. Defaults to `main`.

```yaml
homebrewBranch: main
```

### homebrewPath

**Required**: No

Path in the Homebrew repository where formulas are stored. Defaults to `Formula`.

```yaml
homebrewPath: Formula
```

### homebrewCommitFormat

**Required**: No

Commit message format for Homebrew formula updates. Defaults to `update: {{ formula }} to {{ version }}`.

```yaml
homebrewCommitFormat: 'chore(homebrew): update {{ formula }} to {{ version }}'
```

## Template Variables

### Homebrew Formula Templates

| Variable | Description |
|----------|-------------|
| `{{ version }}` | Version number (without 'v' prefix) |
| `{{ filename*url }}` | Download URL for each uploaded asset |

### Commit Format Templates

| Variable | Description |
|----------|-------------|
| `{{ formula }}` | Formula name (from filename) |
| `{{ version }}` | Version number (without 'v' prefix) |

## Glob Pattern Reference

The action uses `@actions/glob` for pattern matching.

### Basic Patterns

| Pattern | Description |
|---------|-------------|
| `*` | Match any characters (except `/`) |
| `**` | Match any characters (including `/`) |
| `?` | Match single character |
| `[abc]` | Match any character in set |
| `[!abc]` | Match any character not in set |

### Examples

```yaml
files: |
# All files in dist
  dist/*

# All files recursively
  dist/**/*

# Specific extensions
  dist/**/*.tar.gz
  dist/**/*.zip

# Platform-specific binaries
  bin/app-linux-*
  bin/app-darwin-*
  bin/app-windows-*

# Multiple directories
  build/linux/*.tar.gz
  build/darwin/*.tar.gz
  build/windows/*.zip
```

## Changelog Format

### Expected Format

The action extracts changelog content between version markers:

```markdown
# Changelog

## [v1.2.0] - 2024-01-15

[Compare changes](https://github.com/user/repo/compare/v1.1.0...v1.2.0)

### Features

- Added feature X

### Bug Fixes

- Fixed issue Y

## [v1.1.0] - 2024-01-01
...
```

### Extraction Logic

1. Finds `[Compare changes]` link containing the version
2. Captures content until the next `[Compare changes]` link
3. Uses this as the release body

## Complete Example

```yaml
name: Release

on:
  push:
    tags:

      - 'v*'

permissions:
  contents: write

jobs:
  release:
    runs-on: ubuntu-latest
    steps:

      - uses: actions/checkout@v4

        with:
          fetch-depth: 0

      - name: Build

        run: npm run build

      - name: Create Release

        uses: stacksjs/action-releaser@v1.2.6
        with:
# Files to upload
          files: |
            dist/*.tar.gz
            dist/*.zip

# Release configuration
          tag: ${{ github.ref*name }}
          draft: false
          prerelease: ${{ contains(github.ref, '-beta') }}

# Release notes from changelog
          changelog: ./CHANGELOG.md

# Homebrew integration
          homebrewFormula: .github/formula.rb
          homebrewRepo: myorg/homebrew-tap
          homebrewBranch: main
          homebrewPath: Formula
          homebrewCommitFormat: 'chore: update {{ formula }} to {{ version }}'

# Token with write access to homebrew repo
          token: ${{ secrets.HOMEBREW*TOKEN }}
```

## Error Reference

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `GitHub token is required` | Missing token | Add `token` input |
| `No files matched` | Invalid patterns | Check glob patterns |
| `Failed to upload` | Permission/size issue | Check file exists and is valid |
| `Invalid homebrewRepo format` | Wrong format | Use `owner/repo` format |
| `Formula template not found` | Missing file | Check `homebrewFormula` path |

### Token Permissions

For same-repository releases:

- Default `GITHUB_TOKEN` is sufficient
- Needs `contents: write` permission

For cross-repository Homebrew updates:

- Requires Personal Access Token (PAT)
- PAT needs `repo` scope
