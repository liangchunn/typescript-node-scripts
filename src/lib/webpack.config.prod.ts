import CaseSensitivePathsWebpackPlugin from 'case-sensitive-paths-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import * as webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'
import { RuntimeOptions } from '../util/env'
import { formatForkTsCheckerMessages } from './formatForkTsCheckerMessages'
import { formatTsLoaderMessages } from './formatTsLoaderMessages'
import { paths } from './paths'
import { tslintShouldEmitErrors } from './tsLintHelper'

export const WebpackProdConfig: webpack.Configuration = {
  mode: 'production',
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
  devtool: 'source-map',
  output: {
    path: paths.appBuild,
    filename: 'bundle.prod.js',
    libraryTarget: 'commonjs',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: paths.appTsConfig,
        logLevel: 'ERROR',
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
          errorFormatter: formatTsLoaderMessages,
        },
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      silent: true,
      async: false,
      watch: paths.appSrc,
      tsconfig: paths.appTsConfig,
      formatter: formatForkTsCheckerMessages,
      checkSyntacticErrors: true,
      reportFiles: ['**', '!**/__tests__/**', '!**/?(*.)(spec|test|t).*'],
    }),
    new CaseSensitivePathsWebpackPlugin(),
    new CleanWebpackPlugin() as webpack.Plugin,
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
