const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin')
const { WebpackPluginServe } = require('webpack-plugin-serve')
const { plugins } = require('./webpack.config')

exports.devServer = () => ({
  watch: true,
  plugins: [
    new WebpackPluginServe({
      port: process.env.PORT || 8080,
      host: 'localhost',
      static: './dist',
      liveReload: true,
      waitForBuild: true
    })
  ]
})

exports.page = ({ title }) => ({
  plugins: [
    new MiniHtmlWebpackPlugin({ context: { title } }),
  ]
})