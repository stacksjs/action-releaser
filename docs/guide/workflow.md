# Workflow Setup

Learn how to configure GitHub Actions workflows for action-releaser.

## Basic Release Workflow

### Trigger on Tag Push

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

      - name: Build

        run: npm run build

      - name: Create Release

        uses: stacksjs/action-releaser@v1.2.6
        with:
          files: dist/*
```

## Multi-Platform Builds

### Matrix Build Strategy

```yaml
name: Release

on:
  push:
    tags:

      - 'v*'

jobs:
  build:
    strategy:
      matrix:
        include:

          - os: ubuntu-latest

            target: linux-x64

          - os: ubuntu-latest

            target: linux-arm64

          - os: macos-latest

            target: darwin-x64

          - os: macos-latest

            target: darwin-arm64

          - os: windows-latest

            target: windows-x64

    runs-on: ${{ matrix.os }}
    steps:

      - uses: actions/checkout@v4

      - name: Build

        run: npm run build -- --target ${{ matrix.target }}

      - name: Upload Artifact

        uses: actions/upload-artifact@v4
        with:
          name: binary-${{ matrix.target }}
          path: dist/app-${{ matrix.target }}*

  release:
    needs: build
    runs-on: ubuntu-latest
    steps:

      - uses: actions/checkout@v4

      - name: Download All Artifacts

        uses: actions/download-artifact@v4
        with:
          path: binaries
          pattern: binary-*
          merge-multiple: true

      - name: Create Release

        uses: stacksjs/action-releaser@v1.2.6
        with:
          files: binaries/*
```

## With Changelog

### Changelog-Based Release Notes

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

        with:
          fetch-depth: 0

      - name: Build

        run: npm run build

      - name: Create Release

        uses: stacksjs/action-releaser@v1.2.6
        with:
          files: dist/*
          changelog: ./CHANGELOG.md
```

### Expected CHANGELOG Format

```markdown
# Changelog

## [v1.2.0] - 2024-01-15

[Compare changes](https://github.com/user/repo/compare/v1.1.0...v1.2.0)

### Features

- Added new feature X
- Improved performance

### Bug Fixes

- Fixed issue #123

## [v1.1.0] - 2024-01-01
...
```

## With Homebrew

### Complete Homebrew Integration

```yaml
name: Release with Homebrew

on:
  push:
    tags:

      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:

      - uses: actions/checkout@v4

      - name: Build all platforms

        run: |
          npm run build:darwin-arm64
          npm run build:darwin-x64
          npm run build:linux-arm64
          npm run build:linux-x64

      - name: Create Archives

        run: |
          cd dist
          for f in app-*; do
            tar -czvf "${f}.tar.gz" "$f"
          done

      - name: Release and Update Homebrew

        uses: stacksjs/action-releaser@v1.2.6
        with:
          files: dist/*.tar.gz
          homebrewFormula: .github/homebrew-formula.rb
          homebrewRepo: ${{ github.repository*owner }}/homebrew-tap
          homebrewBranch: main
          homebrewPath: Formula
          homebrewCommitFormat: 'chore: update {{ formula }} to {{ version }}'
          token: ${{ secrets.HOMEBREW*TOKEN }}
```

### Formula Template Example

```ruby
# .github/homebrew-formula.rb
class MyApp < Formula
  desc "My awesome application"
  homepage "https://github.com/myorg/myapp"
  version "{{ version }}"
  license "MIT"

  on*macos do
    if Hardware::CPU.arm?
      url "{{ app-darwin-arm64.tar.gz*url }}"
      sha256 "UPDATE*AFTER*RELEASE"

      def install
        bin.install "app-darwin-arm64" => "myapp"
      end
    else
      url "{{ app-darwin-x64.tar.gz*url }}"
      sha256 "UPDATE*AFTER*RELEASE"

      def install
        bin.install "app-darwin-x64" => "myapp"
      end
    end
  end

  on*linux do
    if Hardware::CPU.arm?
      url "{{ app-linux-arm64.tar.gz*url }}"
      sha256 "UPDATE*AFTER*RELEASE"

      def install
        bin.install "app-linux-arm64" => "myapp"
      end
    else
      url "{{ app-linux-x64.tar.gz*url }}"
      sha256 "UPDATE*AFTER*RELEASE"

      def install
        bin.install "app-linux-x64" => "myapp"
      end
    end
  end

  test do
    system "#{bin}/myapp", "--version"
  end
end
```

## Draft and Prerelease

### Conditional Prerelease

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

      - name: Build

        run: npm run build

      - name: Create Release

        uses: stacksjs/action-releaser@v1.2.6
        with:
          files: dist/*
          prerelease: ${{ contains(github.ref, '-beta') || contains(github.ref, '-alpha') || contains(github.ref, '-rc') }}
```

### Draft Release for Review

```yaml

- name: Create Draft Release

  uses: stacksjs/action-releaser@v1.2.6
  with:
    files: dist/*
    draft: true
    note: |
## Changes in this release

      - Feature 1
      - Feature 2

      **This is a draft release for review.**
```

## With Generated Release Notes

### Custom Note Generation

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

        with:
          fetch-depth: 0

      - name: Generate Release Notes

        id: notes
        run: |
# Get commits since last tag
          PREV*TAG=$(git describe --tags --abbrev=0 HEAD^ 2>/dev/null || echo "")
          if [ -n "$PREV*TAG" ]; then
            NOTES=$(git log --pretty=format:"- %s" $PREV*TAG..HEAD)
          else
            NOTES="Initial release"
          fi
          echo "notes<<EOF" >> $GITHUB*OUTPUT
          echo "$NOTES" >> $GITHUB*OUTPUT
          echo "EOF" >> $GITHUB*OUTPUT

      - name: Build

        run: npm run build

      - name: Create Release

        uses: stacksjs/action-releaser@v1.2.6
        with:
          files: dist/*
          note: ${{ steps.notes.outputs.notes }}
```

## Permissions Configuration

### Workflow Permissions

```yaml
permissions:
  contents: write  # Required for creating releases
```

### Using a Personal Access Token

For Homebrew updates to external repositories:

```yaml

- name: Release

  uses: stacksjs/action-releaser@v1.2.6
  with:
    files: dist/*
    token: ${{ secrets.PAT_TOKEN }}
    homebrewRepo: myorg/homebrew-tap
```

## Error Handling

### Continue on Upload Failure

The action will warn but continue if individual file uploads fail:

```
Warning: Failed to upload file.tar.gz: ...
Successfully uploaded other-file.tar.gz
```

### No Files Matched

```
Warning: No files matched the provided patterns
```

## Next Steps

- See the [API reference](/api/reference)
- Go back to [Getting Started](./getting-started.md)
