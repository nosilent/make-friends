const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  entry: './main.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    proxy: {
      "/api": "http://localhost:3000"
    }
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html'
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader'
      },
      {
        test: /\.less$/,
        use: ['vue-style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css", ".vue"],
    alias: {
      "@": path.resolve(__dirname)
    }
  }
}