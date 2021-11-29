// eslint-disable-next-line @typescript-eslint/no-var-requires
const babelJest = require('babel-jest').default

module.exports = babelJest.createTransformer({
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  babelrc: false,
})
