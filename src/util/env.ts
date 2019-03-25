import { TNSOptions } from '../types/TNS'

const { argv } = process

export const RuntimeOptions: TNSOptions = {
  useMonorepo: !!~argv.indexOf('--monorepo'),
  noCollapse: !!~argv.indexOf('--no-collapse'),
  noAutoStart: !!~argv.indexOf('--no-auto-start'),
  bypassCiWarnings: !!~argv.indexOf('--bypass-ci-warnings'),
}

export const IS_CI =
  process.env.CI &&
  (typeof process.env.CI !== 'string' ||
    process.env.CI.toLowerCase() !== 'false')
