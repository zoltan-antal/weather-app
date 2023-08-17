const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/i,
        use: ['html-loader'],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: (pathData) => {
            let filename = pathData.filename;
            filename = filename.replace('src/', '');
            return filename;
          }
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/template.html',
    })
  ],
};
