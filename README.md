<p align="center"><img src=".github/art/cover.jpg" alt="Social Card of this repo"></p>

[![npm version][npm-version-src]][npm-version-href]
[![GitHub Actions][github-actions-src]][github-actions-href]
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
<!-- [![npm downloads][npm-downloads-src]][npm-downloads-href] -->
<!-- [![Codecov][codecov-src]][codecov-href] -->

# Asset Releaser

A GitHub Action to easily attach files to a GitHub release.

## Usage

This action allows you to attach files to a GitHub release using simple glob patterns to specify the files.

```yaml
- name: Attach Files to Release
  uses: stacksjs/action-releaser@v1
  with:
    files: |
      bin/app-linux-x64
      bin/app-linux-arm64
      bin/app-windows-x64.exe
      bin/app-darwin-x64
      bin/app-darwin-arm64
    # Optional parameters:
    # token: ${{ secrets.GITHUB_TOKEN }}
    # tag: ${{ github.ref_name }}
    # draft: false
    # prerelease: false
    # note: 'Release notes'
```

## Inputs

| Name       | Description                           | Required | Default              |
|------------|---------------------------------------|----------|----------------------|
| files      | List of files to attach to the release | Yes      | N/A                  |
| token      | GitHub token                          | No       | `${{ github.token }}` |
| tag        | The tag name for the release          | No       | `${{ github.ref_name }}` |
| draft      | Create a draft release                | No       | `false`               |
| prerelease | Mark as prerelease                    | No       | `false`               |
| note       | Release notes                         | No       | (empty)              |

## Examples

### Basic Usage

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

      # Build your application
      - name: Build
        run: |
          npm ci
          npm run build

      # Create a release and attach files
      - name: Create Release and Attach Files
        uses: stacksjs/action-releaser@v1
        with:
          files: |
            dist/app.zip
            dist/app.tar.gz
```

### Advanced Usage

```yaml
name: Release with Notes

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

      # Generate release notes
      - name: Generate Release Notes
        id: release-notes
        run: echo "NOTES=$(./scripts/generate-notes.sh)" >> $GITHUB_OUTPUT

      # Create a release and attach files
      - name: Create Release and Attach Files
        uses: stacksjs/action-releaser@v1
        with:
          files: |
            dist/*.zip
            dist/*.tar.gz
          note: ${{ steps.release-notes.outputs.NOTES }}
          draft: true
          prerelease: ${{ contains(github.ref, '-beta') || contains(github.ref, '-alpha') }}
```

## Testing

```bash
bun test
```

## Changelog

Please see our [releases](https://github.com/stackjs/action-releaser/releases) page for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

## Community

For help, discussion about best practices, or any other conversation that would benefit from being searchable:

[Discussions on GitHub](https://github.com/stacksjs/action-releaser/discussions)

For casual chit-chat with others using this package:

[Join the Stacks Discord Server](https://discord.gg/stacksjs)

## Postcardware

“Software that is free, but hopes for a postcard.” We love receiving postcards from around the world showing where Stacks is being used! We showcase them on our website too.

Our address: Stacks.js, 12665 Village Ln #2306, Playa Vista, CA 90094, United States 🌎

## Sponsors

We would like to extend our thanks to the following sponsors for funding Stacks development. If you are interested in becoming a sponsor, please reach out to us.

- [JetBrains](https://www.jetbrains.com/)
- [The Solana Foundation](https://solana.com/)

## License

The MIT License (MIT). Please see [LICENSE](LICENSE.md) for more information.

Made with 💙

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/action-releaser?style=flat-square
[npm-version-href]: https://npmjs.com/package/action-releaser
[github-actions-src]: https://img.shields.io/github/actions/workflow/status/stacksjs/action-releaser/ci.yml?style=flat-square&branch=main
[github-actions-href]: https://github.com/stacksjs/action-releaser/actions?query=workflow%3Aci

<!-- [codecov-src]: https://img.shields.io/codecov/c/gh/stacksjs/action-releaser/main?style=flat-square
[codecov-href]: https://codecov.io/gh/stacksjs/action-releaser -->
