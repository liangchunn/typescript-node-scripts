import chalk from 'chalk'
import * as fs from 'fs'
import { paths } from '../../lib/paths'
import { pathsToModuleNameMapper } from 'ts-jest/utils'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const appTsConfig = require(paths.appTsConfig)

export const createJestConfig = (
  rootDir: string,
  resolve: (path: string) => string
) => {
  const setupTests = fs.existsSync(paths.testsSetup)
    ? ['<rootDir>/setupTests.ts']
    : []

  const config = {
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
    testMatch: [
      '<rootDir>/src/**/__tests__/**/*.(j|t)s?(x)',
      '<rootDir>/src/**/?(*.)(spec|test|t).(j|t)s?(x)',
    ],
    transform: {
      '^.+\\.jsx?$': resolve('lib/jest/babelPreprocessor.js'),
      '^.+\\.tsx?$': resolve('lib/jest/typescriptPreprocessor.js'),
    },
    setupFilesAfterEnv: setupTests,
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    globals: {
      NODE_ENV: 'test',
      'ts-jest': {
        tsconfig: paths.appTsConfig,
      },
    },
    moduleNameMapper:
      appTsConfig.baseUrl && appTsConfig.paths
        ? pathsToModuleNameMapper(appTsConfig.paths, {
            prefix: '<rootDir>/',
          })
        : null,
  }

  if (rootDir) {
    ;(config as any).rootDir = rootDir
  }

  const overrides = Object.assign({}, require(paths.appPackageJson).jest)
  const supportedOverrides = [
    'collectCoverageFrom',
    'coverageReporters',
    'coverageThreshold',
  ]

  if (overrides) {
    supportedOverrides.forEach((key) => {
      if (overrides.hasOwnProperty(key)) {
        ;(config as any)[key] = overrides[key]
        delete overrides[key]
      }
    })
    const leftoverOverrides = Object.keys(overrides)
    if (leftoverOverrides.length) {
      console.error(
        chalk.red(
          '\n' +
            'typescript-node-scripts only supports overriding these Jest options: \n\n' +
            supportedOverrides.map((key) => '  ' + chalk.bold(key)).join('\n') +
            '\n\n' +
            'These Jest options in your package.json are not supported: \n\n' +
            leftoverOverrides.map((key) => '  ' + chalk.bold(key)).join('\n') +
            '\n\n'
        )
      )
      process.exit(1)
    }
  }
  return config
}
