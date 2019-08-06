import chalk from 'chalk'
import { paths, resolveOwn, resolveApp } from '../../../lib/paths'
import { getFileHash } from './hash'
import { loadJson, saveJson } from './filesystem'
import * as fs from 'fs-extra'
import { spawnSync } from 'child_process'
import { migrationLogger, MIGRATION_OP_TYPE } from '../../util/migrationLogger'

const log = migrationLogger()

function fileExists(path: string): Promise<boolean> {
  return new Promise(resolve => {
    fs.access(path, fs.constants.F_OK, err => {
      if (err) {
        return resolve(false)
      } else {
        return resolve(true)
      }
    })
  })
}

async function handlePackageJson() {
  const packageJson = await loadJson(paths.appPackageJson)

  const LEGACY_TSLINT_DEFAULT_COMMAND = 'tslint --project .'
  const ESLINT_DEFAULT_COMMAND = "eslint 'src/**/*.{js,ts}'"

  let shouldSave = false

  if ('lint' in packageJson.scripts) {
    if (packageJson.scripts.lint === ESLINT_DEFAULT_COMMAND) {
      return
    }
    if (packageJson.scripts.lint === LEGACY_TSLINT_DEFAULT_COMMAND) {
      log('Updating lint command in package.json', MIGRATION_OP_TYPE.MODIFY)
      packageJson.scripts.lint = ESLINT_DEFAULT_COMMAND
    } else {
      log(
        'Found custom lint command, renaming script to "lint:legacy" in package.json',
        MIGRATION_OP_TYPE.MODIFY
      )
      packageJson.scripts['lint:legacy'] = packageJson.scripts.lint
      log('Adding new lint command in package.json', MIGRATION_OP_TYPE.MODIFY)
      packageJson.scripts.lint = ESLINT_DEFAULT_COMMAND
    }
    shouldSave = true
  } else {
    log('Adding lint command to package.json', MIGRATION_OP_TYPE.WRITE)
    packageJson.scripts.lint = ESLINT_DEFAULT_COMMAND
    shouldSave = true
  }
  if (shouldSave) {
    await saveJson(paths.appPackageJson, packageJson)
  }
}

async function handleLinterConfigs() {
  const LEGACY_TSLINT_JSON_HASH =
    '3d6715a3490c843940026a410a0b41fa8c95ba468e93a8bab18fe0a44baada9c'

  const hasTslintFile = await fileExists(paths.legacyAppTslint)
  const hasEslintFile = await fileExists(paths.appEslint)
  const templateEslintrc = resolveOwn('template/.eslintrc.json')

  let shouldAddEslintFile = true

  if (hasEslintFile) {
    const sameEslintFile =
      (await getFileHash(paths.appEslint)) ===
      (await getFileHash(templateEslintrc))

    if (sameEslintFile) {
      log('.eslintrc.json is already updated', MIGRATION_OP_TYPE.SKIP)
      shouldAddEslintFile = false
    } else {
      log(
        'Renaming existing .eslintrc.json to .eslintrc.json.legacy',
        MIGRATION_OP_TYPE.MODIFY
      )
      // TODO: possible collision
      fs.moveSync(paths.appEslint, paths.appEslint + '.legacy')
    }
  }
  if (shouldAddEslintFile) {
    log('Adding .eslintrc.json', MIGRATION_OP_TYPE.WRITE)
    fs.copyFileSync(templateEslintrc, paths.appEslint)
  }

  if (hasTslintFile) {
    const currentTslintHash = await getFileHash(paths.legacyAppTslint)
    if (currentTslintHash === LEGACY_TSLINT_JSON_HASH) {
      log('Removing legacy tslint.json', MIGRATION_OP_TYPE.DELETE)
      fs.unlinkSync(paths.legacyAppTslint)
    } else {
      log(
        'Renaming existing tslint.json to tslint.json.legacy',
        MIGRATION_OP_TYPE.MODIFY
      )
      fs.moveSync(paths.legacyAppTslint, paths.legacyAppTslint + '.legacy')
    }
  }
}

async function handleLinterDependencies() {
  const packageJson = await loadJson(paths.appPackageJson)

  const { devDependencies = {}, dependenecies = {} } = packageJson
  if ('tslint' in devDependencies) {
    log('Removing tslint from devDependencies', MIGRATION_OP_TYPE.DELETE)
    // @@mutation
    delete packageJson.devDependencies['tslint']
  }
  if ('tslint' in dependenecies) {
    log('Removing tslint from dependencies', MIGRATION_OP_TYPE.DELETE)
    // @@mutation
    delete packageJson.dependencies['tslint']
  }

  // save changes to package.json
  await saveJson(paths.appPackageJson, packageJson)

  const allDependencies = [
    ...Object.keys(devDependencies),
    ...Object.keys(dependenecies),
  ]
  let tslintDependents = []
  for (const dep of allDependencies) {
    if (~dep.indexOf('tslint') && dep !== 'tslint') {
      tslintDependents.push(dep)
    }
  }
  if (tslintDependents.length) {
    log(
      'The following dependencies are related to tslint, but were not removed:',
      MIGRATION_OP_TYPE.INFO
    )
    for (const dep of tslintDependents) {
      log(`  ${dep}`, MIGRATION_OP_TYPE.INFO)
    }
    log(
      'You might want to manually remove them, and add the proper configuration to .eslintrc.json',
      MIGRATION_OP_TYPE.INFO
    )
  }
}

async function handleAddDependencies() {
  const devDependencies = [
    'eslint',
    'eslint-plugin-import',
    'babel-eslint',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
  ]

  const hasYarnLockfile = await fileExists(resolveApp('yarn.lock'))

  let cmd
  let devDependencyArgs

  if (hasYarnLockfile) {
    cmd = 'yarnpkg'
    devDependencyArgs = ['add', '--dev', '--silent', ...devDependencies]
  } else {
    cmd = 'npm'
    devDependencyArgs = [
      'install',
      '--silent',
      '--save-dev',
      ...devDependencies,
    ]
  }

  log(
    'Installing ' + [...devDependencies].map(i => chalk.green(i)).join(', '),
    MIGRATION_OP_TYPE.INSTALL
  )

  // install dev dependencies
  const devDependencyProc = spawnSync(cmd, devDependencyArgs, {
    stdio: 'inherit',
    cwd: resolveApp('.'),
  })

  if (devDependencyProc.status !== 0) {
    console.error()
    console.error(
      chalk.red('Command'),
      chalk.redBright(`'${cmd} ${devDependencyArgs.join(' ')}'`),
      chalk.red('failed.')
    )
    console.error()
    process.exit(1)
  } else {
    log('Successfully installed packages', MIGRATION_OP_TYPE.INSTALL)
  }
}

async function main() {
  try {
    await handlePackageJson()
    await handleLinterConfigs()
    await handleLinterDependencies()
    await handleAddDependencies()

    console.log()
    log(
      'Successfully migrated tslint configuration to eslint configuration',
      MIGRATION_OP_TYPE.DONE
    )
  } catch (e) {
    console.log()
    log(
      'Uh oh, something went wrong. Please open an issue if this problem persists.',
      MIGRATION_OP_TYPE.ERROR
    )
    log(e.message, MIGRATION_OP_TYPE.ERROR)
    log(e.stack, MIGRATION_OP_TYPE.ERROR)
  }
}

main()
