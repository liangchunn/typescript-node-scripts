const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const paths = require('../../lib/paths')
const tsconfig = require(paths.appTsConfig)

/**
 * Transform paths from tsconfig.json to Jest compatible path mappings
 * Transforms
 *   "@_util/*": ["src/_util/*"]
 * into
 *   "@_util/(.*)": "<rootdir>/src/_util/$1"
 * excluding global *
 * @param {json} config
 * @returns {object} key:value path mapping for jest
 */
const transformTsPathsToJestPaths = tsconfig => {
    const { paths = {}, baseUrl = '' } = tsconfig.compilerOptions
    const resolvedBase = path.join('<rootDir>', baseUrl)
    return Object.keys(paths).reduce(
        (acc, key) =>
            key === '*'
                ? acc
                : Object.assign({}, acc, {
                      ['^' + key.replace('*', '(.*)') + '$']: path.join(
                          resolvedBase,
                          paths[key][0].replace('*', '$1')
                      ),
                  }),
        {}
    )
}

module.exports = (rootDir, resolve) => {
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
                tsConfig: paths.appTsConfig,
            },
        },
        moduleNameMapper: transformTsPathsToJestPaths(tsconfig),
    }

    if (rootDir) {
        config.rootDir = rootDir
    }

    const overrides = Object.assign({}, require(paths.appPackageJson).jest)
    const supportedOverrides = [
        'collectCoverageFrom',
        'coverageReporters',
        'coverageThreshold',
    ]

    if (overrides) {
        supportedOverrides.forEach(key => {
            if (overrides.hasOwnProperty(key)) {
                config[key] = overrides[key]
                delete overrides[key]
            }
        })
        const leftoverOverrides = Object.keys(overrides)
        if (leftoverOverrides.length) {
            console.error(
                chalk.red(
                    '\n' +
                        'typescript-node-scripts only supports overriding these Jest options: \n\n' +
                        supportedOverrides
                            .map(key => '  ' + chalk.bold(key))
                            .join('\n') +
                        '\n\n' +
                        'These Jest options in your package.json are not supported: \n\n' +
                        leftoverOverrides
                            .map(key => '  ' + chalk.bold(key))
                            .join('\n') +
                        '\n\n'
                )
            )
            process.exit(1)
        }
    }
    return config
}
