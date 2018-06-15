const fs = require('fs')
const path = require('path')
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

module.exports = (rootDir, srcRoots) => {
    const toRelRootDir = r => '<rootDir>/' + path.relative(rootDir || '', r)

    const setupTests = fs.existsSync(paths.testsSetup)
        ? '<rootDir>/setupTests.ts'
        : undefined

    const config = {
        collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
        testMatch: [
            '<rootDir>/src/**/__tests__/**/*.(j|t)s?(x)',
            '<rootDir>/src/**/?(*.)(spec|test|t).(j|t)s?(x)',
        ],
        transform: {
            '^.+\\.(t|j)sx?$': 'ts-jest',
        },
        setupTestFrameworkScriptFile: setupTests,
        roots: srcRoots.map(toRelRootDir),
        testEnvironment: 'node',
        moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
        globals: {
            'ts-jest': {
                tsConfigFile: paths.appTsTestConfig,
            },
        },
        moduleNameMapper: transformTsPathsToJestPaths(tsconfig),
    }

    if (rootDir) {
        config.rootDir = rootDir
    }
    return config
}
