const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath)

module.exports = {
    appPackageJson: resolveApp('package.json'),
    appIndexJs: resolveApp('src/index.ts'),
    appTsConfig: resolveApp('tsconfig.json'),
    appTsLint: resolveApp('tslint.json'),
    appDevBundlePath: resolveApp('build'),
    appSrc: resolveApp('src'),
    appBuild: resolveApp('dist'),
    testsSetup: resolveApp('setupTests.ts'),
    prodBundle: 'bundle.prod.js',
}

const useTemplate = appDirectory === fs.realpathSync(path.join(__dirname, '..'))

if (useTemplate) {
    module.exports = {
        appPackageJson: resolveOwn('package.json'),
        appIndexJs: resolveOwn('template/src/index.ts'),
        appTsConfig: resolveOwn('template/tsconfig.json'),
        appTsLint: resolveOwn('template/tslint.json'),
        appDevBundlePath: resolveOwn('template/build'),
        appSrc: resolveOwn('template/src'),
        appBuild: resolveOwn('template/dist'),
        testsSetup: resolveOwn('template/setupTests.ts'),
        prodBundle: 'bundle.prod.js',
    }
}
