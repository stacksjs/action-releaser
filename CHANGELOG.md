[Compare changes](https://github.com/stacksjs/action-releaser/compare/v1.2.9...v1.2.10)

## 🐛 Bug Fixes

- **action**: avoid runs when imported ([3aa3cb1](https://github.com/stacksjs/action-releaser/commit/3aa3cb1)) _(by Chris <chrisbreuer93@gmail.com>)_
- **action**: use Node 24 runtime ([32b5489](https://github.com/stacksjs/action-releaser/commit/32b5489)) _(by Chris <chrisbreuer93@gmail.com>)_
- **scripts**: stop double-generating CHANGELOG on release ([9259e80](https://github.com/stacksjs/action-releaser/commit/9259e80)) _(by Glenn Michael Torregosa <gtorregosa@gmail.com>)_
- add setup-bun to publish-commit job ([a3786e1](https://github.com/stacksjs/action-releaser/commit/a3786e1)) _(by glennmichael123 <gtorregosa@gmail.com>)_

## 🤖 Continuous Integration

- add Setup Pantry step before pantry install in lint/typecheck/test jobs ([72d5582](https://github.com/stacksjs/action-releaser/commit/72d5582)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- drop redundant setup-bun (pantry installs bun via deps.yaml) ([c718285](https://github.com/stacksjs/action-releaser/commit/c718285)) _(by glennmichael123 <gtorregosa@gmail.com>)_

## 🧹 Chores

- release v1.2.10 ([f598549](https://github.com/stacksjs/action-releaser/commit/f598549)) _(by Chris <chrisbreuer93@gmail.com>)_
- **deps**: refresh pantry lockfile ([88b8089](https://github.com/stacksjs/action-releaser/commit/88b8089)) _(by Chris <chrisbreuer93@gmail.com>)_
- **release**: add patch release command ([68cab38](https://github.com/stacksjs/action-releaser/commit/68cab38)) _(by Chris <chrisbreuer93@gmail.com>)_
- **deps**: declare bun ^1.3.14 in deps.yaml ([91c5bb1](https://github.com/stacksjs/action-releaser/commit/91c5bb1)) _(by Chris <chrisbreuer93@gmail.com>)_
- **deps**: refresh bun.lock to pick up pickier 0.1.37 ([c1d796f](https://github.com/stacksjs/action-releaser/commit/c1d796f)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- **deps**: refresh bun.lock to pick up pickier 0.1.35 ([1ef7ac5](https://github.com/stacksjs/action-releaser/commit/1ef7ac5)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- **deps**: update shivammathur/setup-php action to v2.37.1 [security] (#710) ([97723c5](https://github.com/stacksjs/action-releaser/commit/97723c5)) _(by [renovate[bot] <29139614+renovate[bot]@users.noreply.github.com>](https://github.com/renovate[bot]))_ ([#710](https://github.com/stacksjs/action-releaser/issues/710), [#710](https://github.com/stacksjs/action-releaser/issues/710))
- **deps**: refresh bun.lock to pick up pickier 0.1.33 ([cf3d85e](https://github.com/stacksjs/action-releaser/commit/cf3d85e)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- **deps**: refresh bun.lock to pick up @stacksjs/logsmith 0.2.3 ([a2a0ac1](https://github.com/stacksjs/action-releaser/commit/a2a0ac1)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- **deps**: refresh bun.lock to pick up buddy-bot 0.9.20 ([c3bfa38](https://github.com/stacksjs/action-releaser/commit/c3bfa38)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- **deps**: bump better-dx to ^0.2.15 ([73769f0](https://github.com/stacksjs/action-releaser/commit/73769f0)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- refresh bun.lock to pick up bun-plugin-dtsx@0.9.18 ([f195b45](https://github.com/stacksjs/action-releaser/commit/f195b45)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- refresh bun.lock and apply pickier --fix ([489a71b](https://github.com/stacksjs/action-releaser/commit/489a71b)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- refresh bun.lock ([241a0ad](https://github.com/stacksjs/action-releaser/commit/241a0ad)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- refresh bun.lock to pick up latest pickier ([d877528](https://github.com/stacksjs/action-releaser/commit/d877528)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- fresh install to pick up dtsx 0.9.14 and bunfig 0.15.9 ([b1b02ec](https://github.com/stacksjs/action-releaser/commit/b1b02ec)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- migrate from bun install to pantry install ([8b3419e](https://github.com/stacksjs/action-releaser/commit/8b3419e)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- fresh install to pick up pickier 0.1.21 ([fde6615](https://github.com/stacksjs/action-releaser/commit/fde6615)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- fix lint errors ([ac3c216](https://github.com/stacksjs/action-releaser/commit/ac3c216)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- auto-fix lint errors ([837b398](https://github.com/stacksjs/action-releaser/commit/837b398)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- include md in pickier lint extensions ([b92cb28](https://github.com/stacksjs/action-releaser/commit/b92cb28)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- update vscode config ([f86d49d](https://github.com/stacksjs/action-releaser/commit/f86d49d)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- repo cleanup and modernization ([f482228](https://github.com/stacksjs/action-releaser/commit/f482228)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- repo cleanup and modernization ([0fda085](https://github.com/stacksjs/action-releaser/commit/0fda085)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- remove @stacksjs/docs ([b0c5bc6](https://github.com/stacksjs/action-releaser/commit/b0c5bc6)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- remove redundant docs/.vitepress ([0ee9de8](https://github.com/stacksjs/action-releaser/commit/0ee9de8)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- remove .zed and .cursor folders ([4d3da12](https://github.com/stacksjs/action-releaser/commit/4d3da12)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- use Pantry action for publish-commit and add job dependencies ([a3cb860](https://github.com/stacksjs/action-releaser/commit/a3cb860)) _(by Chris <chrisbreuer93@gmail.com>)_
- remove file ignores from pickier config ([afb10f3](https://github.com/stacksjs/action-releaser/commit/afb10f3)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- add CLAUDE.md and CHANGELOG.md to pickier ignores ([f5f6107](https://github.com/stacksjs/action-releaser/commit/f5f6107)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- remove .pickierignore ([2ae0b9b](https://github.com/stacksjs/action-releaser/commit/2ae0b9b)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- update better-dx to ^0.2.7 ([f3a24a9](https://github.com/stacksjs/action-releaser/commit/f3a24a9)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- enrich CLAUDE.md with detailed project context from README ([5347b6a](https://github.com/stacksjs/action-releaser/commit/5347b6a)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- update CLAUDE.md with project context and crosswind details ([2f67490](https://github.com/stacksjs/action-releaser/commit/2f67490)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- add proper claude code guidelines ([b1055be](https://github.com/stacksjs/action-releaser/commit/b1055be)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- use pantry monorepo action instead of pantry-setup ([d9ea357](https://github.com/stacksjs/action-releaser/commit/d9ea357)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- ignore claude config in linter ([2fb3147](https://github.com/stacksjs/action-releaser/commit/2fb3147)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- add claude code guidelines ([138e8aa](https://github.com/stacksjs/action-releaser/commit/138e8aa)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- wip ([53c59cd](https://github.com/stacksjs/action-releaser/commit/53c59cd)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- wip ([b38ac97](https://github.com/stacksjs/action-releaser/commit/b38ac97)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- wip ([a26f665](https://github.com/stacksjs/action-releaser/commit/a26f665)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- wip ([9f667f3](https://github.com/stacksjs/action-releaser/commit/9f667f3)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- wip ([f06bb89](https://github.com/stacksjs/action-releaser/commit/f06bb89)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- wip ([cd9934c](https://github.com/stacksjs/action-releaser/commit/cd9934c)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- **deps**: update all non-major dependencies (#335) ([814a7f1](https://github.com/stacksjs/action-releaser/commit/814a7f1)) _(by Chris <chrisbreuer93@gmail.com>)_ ([#335](https://github.com/stacksjs/action-releaser/issues/335), [#335](https://github.com/stacksjs/action-releaser/issues/335))
- wip ([bd620eb](https://github.com/stacksjs/action-releaser/commit/bd620eb)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- wip ([fef2880](https://github.com/stacksjs/action-releaser/commit/fef2880)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- wip ([15c6549](https://github.com/stacksjs/action-releaser/commit/15c6549)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- wip ([e0c4408](https://github.com/stacksjs/action-releaser/commit/e0c4408)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- wip ([37971a0](https://github.com/stacksjs/action-releaser/commit/37971a0)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- wip ([04007cd](https://github.com/stacksjs/action-releaser/commit/04007cd)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- wip ([b15a3d8](https://github.com/stacksjs/action-releaser/commit/b15a3d8)) _(by glennmichael123 <gtorregosa@gmail.com>)_
- wip ([314da31](https://github.com/stacksjs/action-releaser/commit/314da31)) _(by glennmichael123 <gtorregosa@gmail.com>)_

## Contributors

- _Chris <chrisbreuer93@gmail.com>_
- _Glenn Michael Torregosa <gtorregosa@gmail.com>_
- _[renovate[bot] <29139614+renovate[bot]@users.noreply.github.com>](https://github.com/renovate[bot])_
- _glennmichael123 <gtorregosa@gmail.com>_

[Compare changes](https://github.com/stacksjs/action-releaser/compare/v1.2.8...v1.2.9)

### 🧹 Chores

- release v1.2.9 ([5994156](https://github.com/stacksjs/action-releaser/commit/5994156))
- wip ([96148ba](https://github.com/stacksjs/action-releaser/commit/96148ba))
- **deps**: update dependency @actions/core to v3 (#145) ([1e5b0eb](https://github.com/stacksjs/action-releaser/commit/1e5b0eb)) ([#145](https://github.com/stacksjs/action-releaser/issues/145), [#145](https://github.com/stacksjs/action-releaser/issues/145))
- **deps**: update actions/cache action to v5 (#140) ([a848f84](https://github.com/stacksjs/action-releaser/commit/a848f84)) ([#140](https://github.com/stacksjs/action-releaser/issues/140), [#140](https://github.com/stacksjs/action-releaser/issues/140))
- **deps**: update all non-major dependencies (#9) ([a5d522f](https://github.com/stacksjs/action-releaser/commit/a5d522f)) ([#9](https://github.com/stacksjs/action-releaser/issues/9), [#9](https://github.com/stacksjs/action-releaser/issues/9))
- **deps**: update actions/checkout action to v6 (#135) ([e12b3a9](https://github.com/stacksjs/action-releaser/commit/e12b3a9)) ([#135](https://github.com/stacksjs/action-releaser/issues/135), [#135](https://github.com/stacksjs/action-releaser/issues/135))
- remove pantry folder ([7c67bab](https://github.com/stacksjs/action-releaser/commit/7c67bab))

### 📄 Miscellaneous

- Merge pull request #144 from stacksjs/renovate/actions-github-9.x ([2515a75](https://github.com/stacksjs/action-releaser/commit/2515a75)) ([#144](https://github.com/stacksjs/action-releaser/issues/144), [#144](https://github.com/stacksjs/action-releaser/issues/144))

### Contributors

- Chris <chrisbreuer93@gmail.com>
- glennmichael123 <gtorregosa@gmail.com>
- renovate[bot] <29139614+renovate[bot]@users.noreply.github.com>

[Compare changes](https://github.com/stacksjs/action-releaser/compare/v1.2.8...HEAD)

### 🧹 Chores

- wip ([96148ba](https://github.com/stacksjs/action-releaser/commit/96148ba))
- **deps**: update dependency @actions/core to v3 (#145) ([1e5b0eb](https://github.com/stacksjs/action-releaser/commit/1e5b0eb)) ([#145](https://github.com/stacksjs/action-releaser/issues/145), [#145](https://github.com/stacksjs/action-releaser/issues/145))
- **deps**: update actions/cache action to v5 (#140) ([a848f84](https://github.com/stacksjs/action-releaser/commit/a848f84)) ([#140](https://github.com/stacksjs/action-releaser/issues/140), [#140](https://github.com/stacksjs/action-releaser/issues/140))
- **deps**: update all non-major dependencies (#9) ([a5d522f](https://github.com/stacksjs/action-releaser/commit/a5d522f)) ([#9](https://github.com/stacksjs/action-releaser/issues/9), [#9](https://github.com/stacksjs/action-releaser/issues/9))
- **deps**: update actions/checkout action to v6 (#135) ([e12b3a9](https://github.com/stacksjs/action-releaser/commit/e12b3a9)) ([#135](https://github.com/stacksjs/action-releaser/issues/135), [#135](https://github.com/stacksjs/action-releaser/issues/135))
- remove pantry folder ([7c67bab](https://github.com/stacksjs/action-releaser/commit/7c67bab))

### 📄 Miscellaneous

- Merge pull request #144 from stacksjs/renovate/actions-github-9.x ([2515a75](https://github.com/stacksjs/action-releaser/commit/2515a75)) ([#144](https://github.com/stacksjs/action-releaser/issues/144), [#144](https://github.com/stacksjs/action-releaser/issues/144))

### Contributors

- Chris <chrisbreuer93@gmail.com>
- glennmichael123 <gtorregosa@gmail.com>
- renovate[bot] <29139614+renovate[bot]@users.noreply.github.com>

[Compare changes](https://github.com/stacksjs/action-releaser/compare/v1.2.6...v1.2.8)

### 📚 Documentation

- clarify glob pattern support with examples ([e19cdb4](https://github.com/stacksjs/action-releaser/commit/e19cdb4))

### 🧹 Chores

- release v1.2.8 ([48dd1dd](https://github.com/stacksjs/action-releaser/commit/48dd1dd))
- minor updates ([17ac066](https://github.com/stacksjs/action-releaser/commit/17ac066))

### Contributors

- Chris <chrisbreuer93@gmail.com>

[Compare changes](https://github.com/stacksjs/action-releaser/compare/v1.2.7...HEAD)

### 🧹 Chores

- minor updates ([17ac066](https://github.com/stacksjs/action-releaser/commit/17ac066))

### Contributors

- Chris <chrisbreuer93@gmail.com>

[Compare changes](https://github.com/stacksjs/action-releaser/compare/v1.2.5...v1.2.6)

### 🐛 Bug Fixes

- include dist directory in git for GitHub Actions ([b6da289](https://github.com/stacksjs/action-releaser/commit/b6da289))

### 🧹 Chores

- release v1.2.6 ([d42036d](https://github.com/stacksjs/action-releaser/commit/d42036d))
- update deps ([31c590e](https://github.com/stacksjs/action-releaser/commit/31c590e))

### Contributors

- Chris <chrisbreuer93@gmail.com>

[Compare changes](https://github.com/stacksjs/action-releaser/compare/v1.2.5...HEAD)

### 🐛 Bug Fixes

- include dist directory in git for GitHub Actions ([b6da289](https://github.com/stacksjs/action-releaser/commit/b6da289))

### 🧹 Chores

- update deps ([31c590e](https://github.com/stacksjs/action-releaser/commit/31c590e))

### Contributors

- Chris <chrisbreuer93@gmail.com>

[Compare changes](https://github.com/stacksjs/action-releaser/compare/v1.2.4...v1.2.5)

### 🐛 Bug Fixes

- use local action in release workflow ([9c930e1](https://github.com/stacksjs/action-releaser/commit/9c930e1))

### 🧹 Chores

- release v1.2.5 ([401fb00](https://github.com/stacksjs/action-releaser/commit/401fb00))
- update workflow to use v1.2.4 ([52ffa5f](https://github.com/stacksjs/action-releaser/commit/52ffa5f))

### Contributors

- Chris <chrisbreuer93@gmail.com>

[Compare changes](https://github.com/stacksjs/action-releaser/compare/v1.2.4...HEAD)

### 🐛 Bug Fixes

- use local action in release workflow ([9c930e1](https://github.com/stacksjs/action-releaser/commit/9c930e1))

### 🧹 Chores

- update workflow to use v1.2.4 ([52ffa5f](https://github.com/stacksjs/action-releaser/commit/52ffa5f))

### Contributors

- Chris <chrisbreuer93@gmail.com>

[Compare changes](https://github.com/stacksjs/action-releaser/compare/v1.2.3...v1.2.4)

### 🧹 Chores

- release v1.2.4 ([6f2ef4e](https://github.com/stacksjs/action-releaser/commit/6f2ef4e))
- wip ([d814028](https://github.com/stacksjs/action-releaser/commit/d814028))

### Contributors

- Chris <chrisbreuer93@gmail.com>

[Compare changes](https://github.com/stacksjs/action-releaser/compare/v1.2.3...HEAD)

### 🧹 Chores

- wip ([d814028](https://github.com/stacksjs/action-releaser/commit/d814028))

### Contributors

- Chris <chrisbreuer93@gmail.com>

[Compare changes](https://github.com/stacksjs/action-releaser/compare/v1.2.3...HEAD)

### 🧹 Chores

- wip ([d814028](https://github.com/stacksjs/action-releaser/commit/d814028))

### Contributors

- Chris <chrisbreuer93@gmail.com>

[Compare changes](https://github.com/stacksjs/action-releaser/compare/v1.2.2...HEAD)

### Contributors

- Chris <chrisbreuer93@gmail.com>

[Compare changes](https://github.com/stacksjs/action-releaser/compare/v1.2.1...HEAD)

### Contributors

- Chris <chrisbreuer93@gmail.com>

## v1.0.0...main

[compare changes](https://github.com/stacksjs/action-releaser/compare/v1.0.0...main)

### 🚀 Enhancements

- Add homebrew tap releaser ([e289d03](https://github.com/stacksjs/action-releaser/commit/e289d03))

### 🏡 Chore

- Adjust test script ([1ac4578](https://github.com/stacksjs/action-releaser/commit/1ac4578))
- Adjust version target ([8779157](https://github.com/stacksjs/action-releaser/commit/8779157))

### ❤️ Contributors

- Chris ([@chrisbbreuer](https://github.com/chrisbbreuer))

## v0.1.0...main

[compare changes](https://github.com/stacksjs/action-releaser/compare/v0.1.0...main)

### 🏡 Chore

- Adjust readme ([bc0742f](https://github.com/stacksjs/action-releaser/commit/bc0742f))
- Slightly adjust tests ([8f3787c](https://github.com/stacksjs/action-releaser/commit/8f3787c))
- Minify build ([666e617](https://github.com/stacksjs/action-releaser/commit/666e617))

### ❤️ Contributors

- Chris ([@chrisbbreuer](https://github.com/chrisbbreuer))

## v0.0.1...main

[compare changes](https://github.com/stacksjs/action-releaser/compare/v0.0.1...main)

### 🏡 Chore

- Minor adjustments ([f29d7b4](https://github.com/stacksjs/action-releaser/commit/f29d7b4))

### ❤️ Contributors

- Chris ([@chrisbbreuer](https://github.com/chrisbbreuer))

## ...main

### 🏡 Chore

- Initial commit ([d1d0378](https://github.com/stacksjs/action-releaser/commit/d1d0378))
- Adjust meta images ([5fccd65](https://github.com/stacksjs/action-releaser/commit/5fccd65))
- Lint ([254efad](https://github.com/stacksjs/action-releaser/commit/254efad))

### ❤️ Contributors

- Chris ([@chrisbbreuer](https://github.com/chrisbbreuer))
