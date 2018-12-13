const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    search: "./lib/search/search.js",
    playlists: "./lib/playlists/playlists.js",
    favorites: "./lib/favorites/favorites.js"
  },
  output: {
    path: __dirname,
    filename: "lib/[name]/[name].bundle.js"
  },
  mode: 'development',
  module: {
   rules: [
     { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
     { test: /\.css$/, loader: "style!css" },
     { test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader"] },
   ]
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.scss']
  }
};
