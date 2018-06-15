const paths = require('./paths')
const nodeExternals = require('webpack-node-externals')
const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
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
                test: /\.(t|j)sx?$/,
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
                test: /\.(t|j)sx?$/,
                include: paths.appSrc,
                loader: require.resolve('ts-loader'),
                options: {
                    colors: true,
                    errorFormatter: formatTsLoaderMessages,
                },
            },
        ],
    },
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
