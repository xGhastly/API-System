const path = require('path'); // CommonJS

module.exports = {
  mode: 'production',
  entry: {
    'main': './frontend/main.js',
    'login': './frontend/login.js',
    'register': './frontend/register.js'
  },
  output: {
    path: path.resolve(__dirname, 'public', 'assets', 'js'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env']
        }
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.(png|jpe?g|gif|svg)$/i, // Configuração para imagens
      type: 'asset/resource', // Usa asset/resource para mover arquivos para o diretório de saída
    },]
  },
  devtool: 'source-map'
};
