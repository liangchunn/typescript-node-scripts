import * as fs from 'fs'
import * as path from 'path'

const appDirectory = fs.realpathSync(process.cwd())
const useTemplate =
  appDirectory === fs.realpathSync(path.join(__dirname, '../..'))

function resolveApp(relativePath: string): string {
  return path.resolve(appDirectory, relativePath)
}

function resolveOwn(relativePath: string): string {
  return path.resolve(__dirname, '../..', relativePath)
}

export const paths = useTemplate
  ? {
      appPackageJson: resolveOwn('package.json'),
      appIndexJs: resolveOwn('template/src/index.ts'),
      appTsConfig: resolveOwn('template/tsconfig.json'),
      appEslint: resolveOwn('template/.eslintrc.json'),
      appDevBundlePath: resolveOwn('template/build'),
      appSrc: resolveOwn('template/src'),
      appBuild: resolveOwn('template/dist'),
      testsSetup: resolveOwn('template/setupTests.ts'),
      webpackOverride: resolveOwn('template/webpack.config.override.js'),
      prodBundle: 'bundle.prod.js',
    }
  : {
      appPackageJson: resolveApp('package.json'),
      appIndexJs: resolveApp('src/index.ts'),
      appTsConfig: resolveApp('tsconfig.json'),
      appEslint: resolveApp('.eslintrc.json'),
      appDevBundlePath: resolveApp('build'),
      appSrc: resolveApp('src'),
      appBuild: resolveApp('dist'),
      testsSetup: resolveApp('setupTests.ts'),
      webpackOverride: resolveApp('webpack.config.override.js'),
      prodBundle: 'bundle.prod.js',
    }
