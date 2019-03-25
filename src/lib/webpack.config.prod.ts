import * as webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'
import tsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import forkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { tslintShouldEmitErrors } from './tsLintHelper'
import { paths } from './paths'
import { formatForkTsCheckerMessages } from './formatForkTsCheckerMessages'
import { formatTsLoaderMessages } from './formatTsLoaderMessages'
import { RuntimeOptions } from '../util/env'

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
