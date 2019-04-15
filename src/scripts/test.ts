import * as jest from 'jest'
import * as path from 'path'
import '../injectors/test'
import { paths } from '../lib/paths'
import { createJestConfig } from './util/createJestConfig'
const argv = process.argv.slice(2)

if (
  !process.env.CI &&
  argv.indexOf('--coverage') === -1 &&
  argv.indexOf('--watchAll') === -1
) {
  argv.push('--watch')
}

argv.push(
  '--config',
  JSON.stringify(
    createJestConfig(path.resolve(paths.appSrc, '..'), (relativePath: string) =>
      path.resolve(__dirname, '..', relativePath)
    )
  )
)

jest.run(argv)
