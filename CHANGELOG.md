## 0.4.1
  * Improve tests
  * Remove object spread syntax which is not supported in `node6`

## 0.4.0
  * Fix issue where ambient TypeScript files (with only type definitions) being persisted across incremental builds
    * Use `fork-ts-checker-webpack-plugin` for checking
    * Use `babel-code-frame` for displaying source in terminal
  * Ignore test files in tsconfig.json template

## 0.3.0
  * Support Jest configuration overrides for keys
    * `collectCoverageFrom`
    * `coverageReporters`
    * `coverageThreshold`

## 0.2.4
  * Added meaningful defaults for tslint

## 0.2.3
  * Add missing support for code and signal handling in child process

## 0.2.2
  * (lib) Fix case sensitive imports

## 0.2.1
  * Initial version
