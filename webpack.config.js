const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {

  entry: './src/index.js',
  
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
      new HTMLWebpackPlugin({
          template: './src/index.html'
      })
  ],
  module:{
      rules: [
          {
            test: /\.(js|jsx)$/,
              exclude: /node_modiles/,
              use:{
                  loader:'babel-loader',
                  options:{
                      presets: ['@babel/preset-env', '@babel/preset-react']
                  }
              }
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ]
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i, 
            use: [
              {
                loader: 'file-loader',
              },
            ]
        }
      ]
  },
  devServer: {
    historyApiFallback: true,
  }

}