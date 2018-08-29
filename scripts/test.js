process.env.NODE_ENV = 'test'
process.on('unhandledRejection', err => {
    throw err
})

const jest = require('jest')
const argv = process.argv.slice(2)

if (
    !process.env.CI &&
    argv.indexOf('--coverage') === -1 &&
    argv.indexOf('--watchAll') === -1
) {
    argv.push('--watch')
}

const createJestConfig = require('./util/createJestConfig')
const path = require('path')
const paths = require('../lib/paths')

argv.push(
    '--config',
    JSON.stringify(
        createJestConfig(
            path.resolve(paths.appSrc, '..'),
            [paths.appSrc],
            relativePath => path.resolve(__dirname, '..', relativePath)
        )
    )
)

jest.run(argv)
