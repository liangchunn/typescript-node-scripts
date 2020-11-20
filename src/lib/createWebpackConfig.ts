import * as webpack from 'webpack'
import CaseSensitivePathsWebpackPlugin from 'case-sensitive-paths-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import nodeExternals from 'webpack-node-externals'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'

import { formatTsLoaderMessages } from './formatTsLoaderMessages'
import { paths } from './paths'
import { RuntimeOptions } from '../util/env'

export const createWebpackConfig = (
  environment: 'development' | 'production'
): webpack.Configuration => {
  const isDev = environment === 'development'

  return {
    mode: environment,
    entry: paths.appIndexJs,
    target: 'node',
    externals: [
      nodeExternals(
        RuntimeOptions.useMonorepo
          ? {
              modulesFromFile: true,
            }
          : undefined
      ) as any,
    ],
    devtool: isDev ? 'eval-cheap-source-map' : 'cheap-source-map',
    output: {
      path: isDev ? paths.appDevBundlePath : paths.appBuild,
      filename: isDev ? 'bundle.js' : 'bundle.prod.js',
      libraryTarget: 'commonjs',
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: paths.appTsConfig,
          silent: true,
        }),
      ],
    },
    module: {
      rules: [
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
      new ESLintPlugin({
        eslintPath: require.resolve('eslint'),
        extensions: ['js', 'ts', 'jsx', 'tsx'],
        formatter: 'stylish',
        emitWarning: true,
        resolvePluginsRelativeTo: __dirname,
        overrideConfigFile: paths.appEslint,
      } as any),
      new ForkTsCheckerWebpackPlugin({
        async: false,
        typescript: {
          configFile: paths.appTsConfig,
        },
        formatter: 'codeframe',
      }),
      new CaseSensitivePathsWebpackPlugin(),
      new CleanWebpackPlugin(),
    ] as webpack.WebpackPluginInstance[],
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
}
