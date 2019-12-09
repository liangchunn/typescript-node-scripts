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
import eslintFormatter from './formatters/eslintFormatter'
import eslintConfig from './eslintrc'

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
      new TsconfigPathsPlugin({
        configFile: paths.appTsConfig,
        logLevel: 'ERROR',
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        enforce: 'pre',
        use: [
          {
            loader: require.resolve('eslint-loader'),
            options: {
              eslintPath: require.resolve('eslint'),
              formatter: eslintFormatter,
              useEslintrc: false,
              emitWarning: true,
              resolvePluginsRelativeTo: __dirname,
              baseConfig: eslintConfig
            },
          },
        ],
        include: paths.appSrc,
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
    new CleanWebpackPlugin(),
  ] as webpack.Plugin[],
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
