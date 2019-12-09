import { TNSOptions } from '../types/TNS'

const { argv } = process

export const TNS_ARGUMENTS = {
  MONOREPO: '--monorepo',
  NO_COLLAPSE: '--no-collapse',
  NO_AUTO_STATRT: '--no-auto-start',
  BYPASS_CI_WARNINGS: '--bypass-ci-warnings',
  OVERRIDE_ESLINT_CONFIG: '--override-eslint-config',
}

export const RuntimeOptions: TNSOptions = {
  useMonorepo: !!~argv.indexOf(TNS_ARGUMENTS.MONOREPO),
  noCollapse: !!~argv.indexOf(TNS_ARGUMENTS.NO_COLLAPSE),
  noAutoStart: !!~argv.indexOf(TNS_ARGUMENTS.NO_AUTO_STATRT),
  bypassCiWarnings: !!~argv.indexOf(TNS_ARGUMENTS.BYPASS_CI_WARNINGS),
  overrideEslintConfig: !!~argv.indexOf(TNS_ARGUMENTS.OVERRIDE_ESLINT_CONFIG),
}

export const IS_CI =
  process.env.CI &&
  (typeof process.env.CI !== 'string' ||
    process.env.CI.toLowerCase() !== 'false')

export const IS_INTERACTIVE = process.stdout.isTTY
