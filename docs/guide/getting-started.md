# Getting Started

Learn how to use action-releaser to attach files to your GitHub releases.

## Overview

action-releaser is a GitHub Action that makes it easy to:

- Attach build artifacts to GitHub releases
- Use glob patterns to match multiple files
- Automatically create releases if they don't exist
- Update Homebrew formulas in tap repositories

## Basic Usage

Add the action to your release workflow:

```yaml
- name: Attach Files to Release
  uses: stacksjs/action-releaser@v1.2.6
  with:
    files: |
      bin/app-linux-x64
      bin/app-linux-arm64
      bin/app-windows-x64.exe
      bin/app-darwin-x64
      bin/app-darwin-arm64
```

## Complete Workflow Example

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1

      - name: Install dependencies
        run: bun install

      - name: Build
        run: bun run build

      - name: Create Release and Attach Files
        uses: stacksjs/action-releaser@v1.2.6
        with:
          files: |
            dist/app.zip
            dist/app.tar.gz
```

## Glob Pattern Support

Use glob patterns to match multiple files:

```yaml
- name: Attach Files with Glob Patterns
  uses: stacksjs/action-releaser@v1.2.6
  with:
    files: |
      # Match all .tar.gz files
      dist/**/*.tar.gz

      # Match all .zip files
      dist/**/*.zip

      # Specific patterns
      bin/app-*-x64
      bin/app-*-arm64
```

### Glob Examples

```yaml
files: |
  # All files in directory
  dist/*

  # Recursive match
  build/**/*

  # Specific extensions
  *.tar.gz
  *.zip

  # Multiple directories
  ion-binaries/ion-linux-x64/*.tar.gz
  ion-binaries/ion-darwin-x64/*.tar.gz
```

## Optional Configuration

### Release Options

```yaml
- name: Create Release
  uses: stacksjs/action-releaser@v1.2.6
  with:
    files: dist/*
    tag: ${{ github.ref_name }}    # Default: current tag
    draft: false                    # Create as draft
    prerelease: false               # Mark as prerelease
    note: 'Release notes here'      # Release body
```

### Custom Token

```yaml
- name: Create Release
  uses: stacksjs/action-releaser@v1.2.6
  with:
    files: dist/*
    token: ${{ secrets.CUSTOM_TOKEN }}
```

### Changelog Integration

Extract release notes from your CHANGELOG.md:

```yaml
- name: Create Release
  uses: stacksjs/action-releaser@v1.2.6
  with:
    files: dist/*
    changelog: ./CHANGELOG.md
```

The action will find the section matching your release version.

## Homebrew Formula Update

Automatically update a Homebrew formula when you release:

```yaml
- name: Release with Homebrew Update
  uses: stacksjs/action-releaser@v1.2.6
  with:
    files: |
      dist/app-darwin-arm64.tar.gz
      dist/app-darwin-x64.tar.gz
      dist/app-linux-arm64.tar.gz
      dist/app-linux-x64.tar.gz
    homebrewFormula: .github/homebrew-formula.rb
    homebrewRepo: username/homebrew-tap
    homebrewPath: Formula
    token: ${{ secrets.HOMEBREW_TOKEN }}
```

### Formula Template

Create a formula template (e.g., `.github/homebrew-formula.rb`):

```ruby
class YourApp < Formula
  desc "Your application description"
  homepage "https://github.com/username/repo"
  version "{{ version }}"

  on_macos do
    if Hardware::CPU.arm?
      url "{{ app-darwin-arm64.tar.gz_url }}"
      sha256 "UPDATE_SHA"
    else
      url "{{ app-darwin-x64.tar.gz_url }}"
      sha256 "UPDATE_SHA"
    end
  end

  on_linux do
    if Hardware::CPU.arm?
      url "{{ app-linux-arm64.tar.gz_url }}"
      sha256 "UPDATE_SHA"
    else
      url "{{ app-linux-x64.tar.gz_url }}"
      sha256 "UPDATE_SHA"
    end
  end

  def install
    bin.install "yourapp"
  end
end
```

### Template Variables

- `{{ version }}` - Version number (without 'v' prefix)
- `{{ filename_url }}` - Download URL for each uploaded asset

## Permissions

### Default Token

The default `GITHUB_TOKEN` works for:
- Creating/updating releases in the same repository
- Uploading release assets

### Homebrew Updates

For updating formulas in a different repository, you need a Personal Access Token (PAT):

1. Create a PAT with `repo` scope
2. Add it as a repository secret
3. Pass it to the action

```yaml
token: ${{ secrets.HOMEBREW_TOKEN }}
```

## Next Steps

- Learn about [workflow configuration](./workflow.md)
- See the [API reference](/api/reference)
