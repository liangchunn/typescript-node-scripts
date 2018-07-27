# typescript-node-scripts
[![Build Status](https://travis-ci.com/liangchunn/typescript-node-scripts.svg?branch=master)](https://travis-ci.com/liangchunn/typescript-node-scripts) [![npm](https://img.shields.io/npm/v/typescript-node-scripts.svg)](https://www.npmjs.com/package/typescript-node-scripts) [![npm](https://img.shields.io/npm/dt/typescript-node-scripts.svg)](https://www.npmjs.com/package/typescript-node-scripts) [![install size](https://packagephobia.now.sh/badge?p=typescript-node-scripts)](https://packagephobia.now.sh/result?p=typescript-node-scripts) [![Greenkeeper badge](https://badges.greenkeeper.io/liangchunn/typescript-node-scripts.svg)](https://greenkeeper.io/)

Create Node.js applications based on TypeScript with zero-configuration.
<p align="center">
    <img 
    width="600" src="https://cdn.rawgit.com/liangchunn/typescript-node-scripts/12e1600/.resources/term.svg"/>
</p>

Inspired by `create-react-app` and Dan Abramov's [The Melting Pot of JavaScript](https://increment.com/development/the-melting-pot-of-javascript/).
- Supports testing, building, and development in watch mode
- Supports custom TypeScript path mappings, aka `compilerOptions.path`

## Quick Start Guide
```sh
npx typescript-node-scripts create <appName>
cd <appName>
yarn start
```

## Requirements

-   node `>=6.0.0`
-   `process.platform !== 'win32'`


## Commands

### `yarn start` or `npm run start`

Starts the development server with watch mode and incremental builds. This command generates a bundle which is located at `build/bundle.js`.

#### Options

| Argument          | Description                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| `--no-collapse`   | Expands all the collapsed errors                                                                   |
| `--no-auto-start` | Disables auto starting and stopping of the application. By default, it executes `build/bundle.js`. |

### `yarn build` or `npm run build`

Builds a production ready bundle. This minifies all sources into one simple, distributable `dist/bundle.prod.js` alongside `dist/bundle.prod.js.map` which is ideal for Docker builds.

This command does not bundle any dependencies which is `require`-d or `import`-ed from `node_modules`!

#### Options

| Argument               | Description                                 |
| ---------------------- | ------------------------------------------- |
| `--no-collapse`        | Expands all the collapsed errors            |
| `--bypass-ci-warnings` | Bypass CI warnings being treated as errors. |

### `yarn test` or `npm run test`

Runs the Jest test runners in watch mode by default. You can add in Jest options as usual.

#### Example commands

```sh
yarn test --coverage

yarn test --watchAll
```

## Tests
Jest is the main test runner that this package supports.

### Test files
Everything that matches the globs below will be passed to Jest as a test file:
- `src/**/__tests__/**/*.(j|t)s?(x)`
- `src/**/?(*.)(spec|test|t).(j|t)s?(x)`

### Setting up the test framework
You can use `setupTests.ts` in your project root to set up the testing framework before each test.

### Overriding Jest configuration
You can override the Jest configuration in your `package.json` with the key `jest`.

The following options can be overriden:
- `collectCoverageFrom`
- `coverageReporters`
- `coverageThreshold`

## Custom Module Paths
TNS supports custom module path mappings. A default custom path mapping is provided in `tsconfig.json`

```json
{
    "paths": {
        "~/*": ["src/*"]
    }
}
```

This configuration allows you to import any module which resolves absolutely to `src`.

```ts
// src/lib/a/b/Module.ts

// instead of
import Module from '../../../Module'

// you can do
import Module from '~/Module'
```

## Source Maps
Source maps are enabled by default and postfixed with `.map` in the `build` and `dist` folders. These files provide accurate source mappings which are helpful when debugging errors and looking at stack traces during runtime.

In order to tell Node to use these source maps, you would need to install `source-map-support`.

```sh
# if you're using yarn
yarn add source-map-support

# if you're using npm
npm i -S source-map-support
```

Then, in `src/index.ts`, add:
```ts
import 'source-map-support/register'
```

## TODO

-   [ ] e2e tests
