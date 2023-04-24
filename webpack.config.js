const { resolve } = require('path');
const { readdirSync } = require('fs');
const TerserPlugin = require("terser-webpack-plugin");

let entryObject = {};
readdirSync('./pages').forEach(page => {
  if(page.split('.tsx').length > 1) {
    entryObject = {...entryObject, [page.split('.tsx')[0]]: `./pages/${page}`}
  }
});

module.exports = {
  entry: entryObject,
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: 'ts-loader',
        include: /pages/,
        exclude: /node_modules/
      },
      {
        test: /\.(js|mjs)?$/,
        resolve: { fullySpecified: false },
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
      {
        test: /\.(css)$/,
        use: ['style-loader','css-loader']
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: resolve('./dist/public/js/'),
  },
  mode: 'development',
  /**
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  }
  */
};