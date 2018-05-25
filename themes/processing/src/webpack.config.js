const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const extractSass = new ExtractTextPlugin({
  filename: `hugotheme.min.css`
})

module.exports = {
  devtool: 'source-map',
  entry: {
    hugotheme: './js/main.js'
  },
  output: {
    path: path.join(__dirname, '../static/dist'),
    filename: `[name].min.js`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader', options: {minimize: true, sourceMap: true}
          }, {
            loader: 'postcss-loader', options: {sourceMap: true}
          }, {
            loader: 'sass-loader', options: {sourceMap: true}
          }],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    extractSass,
    new UglifyJSPlugin({
      sourceMap: true
    })
  ]
}
