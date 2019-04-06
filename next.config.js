const withPlugins = require('next-compose-plugins')
const withCSS = require('@zeit/next-css')
const withTM = require('next-transpile-modules')

const nextConfig = {
  webpack (config) {
    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/i,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          publicPath: './',
          outputPath: 'static/css/',
          name: '[name].[ext]'
        }
      }
    })

    return config
  },
  poweredByHeader: false
}

module.exports = withPlugins([
  withCSS,
  [ withTM, { transpileModules: ['react-syntax-highlighter/dist'] } ]
], nextConfig)
