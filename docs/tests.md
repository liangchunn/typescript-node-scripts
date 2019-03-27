---
id: tests
title: Testing your Application
---

Jest is the main test runner that this package supports.

## Test files

Everything that matches the globs below will be passed to Jest as a test file:

- `src/**/__tests__/**/*.(j|t)s?(x)`
- `src/**/?(*.)(spec|test|t).(j|t)s?(x)`

## Setting up the test framework

You can use `setupTests.ts` in your project root to set up the testing framework before each test.

## Overriding Jest configuration

You can override the Jest configuration in your `package.json` with the key `jest`.

The following options can be overriden:

- `collectCoverageFrom`
- `coverageReporters`
- `coverageThreshold`