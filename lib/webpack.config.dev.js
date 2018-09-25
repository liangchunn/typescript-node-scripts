const paths = require('./paths')
const nodeExternals = require('webpack-node-externals')
const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const forkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const formatForkTsCheckerMessages = require('./formatForkTsCheckerMessages')
const formatTsLoaderMessages = require('./formatTsLoaderMessages')
const { tslintShouldEmitErrors } = require('./tsLintHelper')

module.exports = {
    mode: 'development',
    entry: paths.appIndexJs,
    target: 'node',
    externals: [nodeExternals()],
    devtool: 'inline-source-map',
    output: {
        path: paths.appDevBundlePath,
        filename: 'bundle.js',
        libraryTarget: 'commonjs',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx', '.json'],
        plugins: [
            new tsconfigPathsPlugin({
                configFile: paths.appTsConfig,
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                use: [
                    {
                        loader: require.resolve('tslint-loader'),
                        options: {
                            emitErrors: tslintShouldEmitErrors(paths.appTsLint),
                            tsConfigFile: paths.appTsConfig,
                            configFile: paths.appTsLint,
                            formatter: 'lintTable',
                            formattersDirectory: __dirname + '/formatters/',
                        },
                    },
                ],
            },
            {
                test: /\.jsx?$/,
                include: paths.appSrc,
                exclude: /node_modules/,
                loader: require.resolve('babel-loader'),
                options: {
                    babelrc: false,
                    presets: [require.resolve('@babel/preset-env')],
                    compact: true,
                },
            },
            {
                test: /\.tsx?$/,
                include: paths.appSrc,
                loader: require.resolve('ts-loader'),
                options: {
                    transpileOnly: true,
                    experimentalWatchApi: true,
                    errorFormatter: formatTsLoaderMessages({}),
                },
            },
        ],
    },
    plugins: [
        new forkTsCheckerWebpackPlugin({
            silent: true,
            async: false,
            watch: paths.appSrc,
            tsconfig: paths.appTsConfig,
            formatter: formatForkTsCheckerMessages({}),
        }),
    ],
    optimization: {
        nodeEnv: false,
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    performance: {
        hints: false,
    },
}
