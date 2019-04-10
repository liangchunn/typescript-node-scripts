import * as webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'
import tsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import forkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import caseSensitivePathsWebpackPlugin from 'case-sensitive-paths-webpack-plugin'
import { tslintShouldEmitErrors } from './tsLintHelper'
import { paths } from './paths'
import { formatForkTsCheckerMessages } from './formatForkTsCheckerMessages'
import { formatTsLoaderMessages } from './formatTsLoaderMessages'
import { RuntimeOptions } from '../util/env'

export const WebpackDevConfig: webpack.Configuration = {
  mode: 'development',
  entry: paths.appIndexJs,
  target: 'node',
  externals: [
    nodeExternals(
      RuntimeOptions.useMonorepo
        ? {
            modulesFromFile: true,
          }
        : undefined
    ),
  ],
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
          errorFormatter: formatTsLoaderMessages,
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
      formatter: formatForkTsCheckerMessages,
      checkSyntacticErrors: true,
      reportFiles: ['**', '!**/__tests__/**', '!**/?(*.)(spec|test|t).*'],
    }),
    new caseSensitivePathsWebpackPlugin(),
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
