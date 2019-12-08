process.on('unhandledRejection', err => {
  throw err
})

import chalk from 'chalk'
import { execSync, spawnSync } from 'child_process'
import * as fs from 'fs-extra'
import * as os from 'os'
import * as path from 'path'
import { yarnAvailable } from './util/yarnAvailable'

const argv = process.argv.slice(2)

const createApp = (useYarn: boolean, appName?: string) => {
  if (!appName) {
    console.error(
      'Please specify the directory you want to create your project:'
    )
    console.error(
      `  ${chalk.cyan('typescript-node-scripts create')} ${chalk.green(
        '<directory>'
      )}`
    )
    return process.exit(1)
  }

  const appPath = path.join(process.cwd(), appName)

  console.log('Creating application ' + chalk.cyan(appName) + '\n')
  const appPackageJson = {
    name: appName,
    version: '0.1.0',
    main: 'src/index.ts',
    private: true,
    scripts: {
      test: 'typescript-node-scripts test',
      start: 'typescript-node-scripts start',
      build: 'typescript-node-scripts build',
      lint: "eslint 'src/**/*.{js,ts}'",
    },
  }

  const packageDevDependencies = [
    '@types/node',
    '@types/jest',
    'typescript',
    // 'eslint',
    // 'eslint-plugin-import',
    // 'babel-eslint',
    // '@typescript-eslint/eslint-plugin',
    // '@typescript-eslint/parser',
    'typescript-node-scripts',
  ]

  // check if the path exists
  if (fs.existsSync(appPath)) {
    console.error()
    console.error(chalk.red('Failed to create app.'))
    console.error(chalk.red('Directory "' + appName + '" exists.'))
    console.error()
    process.exit(1)
  }

  // set up the template
  fs.copySync(path.join(__dirname, '../../template'), appPath)

  // create the package json
  fs.writeFileSync(
    path.join(appPath, 'package.json'),
    JSON.stringify(appPackageJson, null, 2) + os.EOL
  )
  // copy gitignore
  fs.copySync(
    path.join(__dirname, '../../template/gitignore'),
    path.join(appPath, '.gitignore')
  )
  fs.unlinkSync(path.join(appPath, 'gitignore'))

  // install package dependencies
  console.log(
    'Installing ' +
      [...packageDevDependencies].map(i => chalk.cyan(i)).join(', ')
  )

  let cmd
  let devDependencyArgs

  if (useYarn) {
    cmd = 'yarnpkg'
    devDependencyArgs = ['add', ...packageDevDependencies, '--dev']
  } else {
    cmd = 'npm'
    devDependencyArgs = ['install', '--save-dev', ...packageDevDependencies]
  }

  // install dev dependencies
  const devDependencyProc = spawnSync(cmd, devDependencyArgs, {
    stdio: 'inherit',
    cwd: appPath,
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
  }

  // install dependencies
  // const dependencyProc = spawn(cmd, dependencyArgs, {
  //     stdio: 'inherit',
  //     cwd: appPath,
  // })
  // if (dependencyProc.status !== 0) {
  //     console.error()
  //     console.error(
  //         chalk.red('Command'),
  //         chalk.redBright(`'${cmd} ${dependencyArgs.join(' ')}'`),
  //         chalk.red('failed.')
  //     )
  //     console.error()
  //     process.exit(1)
  // }

  // initialize git repo
  try {
    execSync('git init', {
      cwd: appPath,
      stdio: 'ignore',
    })
    execSync('git add -A', {
      cwd: appPath,
      stdio: 'ignore',
    })
    execSync('git commit -m "first commit by typescript-node-scripts"', {
      cwd: appPath,
      stdio: 'ignore',
    })
  } catch (e) {
    console.warn(
      chalk.yellow(
        'Failed to initialize git repository. You might want to initialize it yourself.'
      )
    )
  }

  const displayedCommand = useYarn ? 'yarn' : 'npm'
  console.log()
  console.log(chalk.green('Successfully created ' + appName + ' at ' + appPath))
  console.log('Inside your project directory, you can run these commands:')
  console.log()
  console.log(chalk.cyan(`  ${displayedCommand} start`))
  console.log('    Starts the development server.')
  console.log()
  console.log(chalk.cyan(`  ${displayedCommand} test`))
  console.log('    Runs the Jest test runner.')
  console.log()
  console.log(chalk.cyan(`  ${displayedCommand} build`))
  console.log('    Bundles your application into a production-ready bundle.')
  console.log()
  console.log(
    chalk.green('To get started right away, we recommend running: \n')
  )
  console.log(chalk.cyan('  cd'), appName)
  console.log(chalk.cyan(`  ${displayedCommand}`), 'start')
  console.log()
}

createApp(yarnAvailable(), argv[0])
