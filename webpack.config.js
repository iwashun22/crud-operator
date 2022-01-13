const path = require('path');

module.exports = {
   mode: 'development',
   target: 'node',
   externalPresets: {
      node: true
   }
   entry: {
      app: './src/index.js'
   },
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.bundle.js'
   },
   module: {
      rules: [{
         test: /\.js?$/,
         exclude: /node_modules/,
         loader: 'babel-loader',
         options: {
            presets: ['@babel/preset-env']
         }
      }]
   }
}