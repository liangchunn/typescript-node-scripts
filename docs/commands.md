---
id: commands
title: Commands Reference
---

## `yarn start`

Starts the development server with watch mode and incremental builds. This command generates a bundle which is located at `build/bundle.js`.

### Options

| Argument                   | Description                                                                                        |
| -------------------------- | -------------------------------------------------------------------------------------------------- |
| `--no-collapse`            | Expands all the collapsed errors                                                                   |
| `--no-auto-start`          | Disables auto starting and stopping of the application. By default, it executes `build/bundle.js`. |
| `--monorepo`               | Enable support for monorepos                                                                       |
| `--override-eslint-config` | Completely overrides TNS's ESLint configration with user defined `.eslintrc.*` files               |

## `yarn build`

Builds a production ready bundle. This minifies all sources into one simple, distributable `dist/bundle.prod.js` alongside `dist/bundle.prod.js.map` which is ideal for Docker builds.

**This command does not bundle any dependencies which is `require`-d or `import`-ed from `node_modules`!**

### Options

| Argument                   | Description                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------ |
| `--no-collapse`            | Expands all the collapsed errors                                                     |
| `--bypass-ci-warnings`     | Bypass CI warnings being treated as errors.                                          |
| `--monorepo`               | Enable support for monorepo                                                          |
| `--override-eslint-config` | Completely overrides TNS's ESLint configration with user defined `.eslintrc.*` files |

## `yarn test`

Runs the Jest test runners in watch mode by default. You can add in Jest options as usual.

### Example commands

```sh
yarn test --coverage

yarn test --watchAll
```
