process.on('unhandledRejection', err => {
  throw err
})

const fs = require('fs-extra')
const spawn = require('child_process').spawnSync
const exec = require('child_process').execSync
const path = require('path')
const os = require('os')
const chalk = require('chalk')

const argv = process.argv.slice(2)

const createApp = (appName, useYarn) => {
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
      lint: 'tslint --project .',
    },
  }

  // const packageDependencies = ['typescript-node-scripts']
  const packageDevDependencies = [
    '@types/node',
    '@types/jest',
    'tslint',
    'typescript',
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
  fs.copySync(path.join(__dirname, '../template'), appPath)

  // create the package json
  fs.writeFileSync(
    path.join(appPath, 'package.json'),
    JSON.stringify(appPackageJson, null, 2) + os.EOL
  )
  // copy gitignore
  fs.copySync(
    path.join(__dirname, '../template/gitignore'),
    path.join(appPath, '.gitignore')
  )
  fs.unlinkSync(path.join(appPath, 'gitignore'))

  // install package dependencies
  console.log(
    'Installing ' +
      [...packageDevDependencies].map(i => chalk.cyan(i)).join(', ')
  )

  let cmd
  // let dependencyArgs
  let devDependencyArgs

  if (useYarn) {
    cmd = 'yarnpkg'
    // dependencyArgs = ['add', ...packageDependencies]
    devDependencyArgs = ['add', ...packageDevDependencies, '--dev']
  } else {
    cmd = 'npm'
    // dependencyArgs = ['install', '--save', ...packageDependencies]
    devDependencyArgs = ['install', '--save-dev', ...packageDevDependencies]
  }

  // install dev dependencies
  const devDependencyProc = spawn(cmd, devDependencyArgs, {
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
    exec('git init', {
      cwd: appPath,
      stdio: 'ignore',
    })
    exec('git add -A', {
      cwd: appPath,
      stdio: 'ignore',
    })
    exec('git commit -m "first commit by typescript-node-scripts"', {
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

const yarnAvailable = () => {
  try {
    exec('yarnpkg --version', { stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
}

createApp(argv[0], yarnAvailable())
