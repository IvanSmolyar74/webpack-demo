const glob = require('glob')
const { mode } = require('webpack-nano/argv')
const { merge } = require('webpack-merge')
const { page, devServer } = require('./webpack.parts')
const { cssLoader, eliminateUnusedCSS } = require('./webpack.styles')

const commonConfig = merge([
  {
    entry: ['./src'],
  },
  page({ title: 'Demo' }),
  cssLoader()
])

const productionConfig = merge([eliminateUnusedCSS()])

const developmentConfig = merge([
  { entry: ['webpack-plugin-serve/client'] },
  devServer()
])

const getConfig = (mode) => {
  switch (mode) {
    case 'production':
      return merge(commonConfig, productionConfig, { mode })
    case 'development':
      return merge(commonConfig, developmentConfig, { mode })
    default:
      throw new Error(`Trying to use an unknown mode, ${mode}`)
  }
}

module.exports = getConfig(mode)