// File: webpack.config.js
// December 2017

var webpack = require('webpack');
var path = require('path');

module.exports = {
	devtool: 'inline-source-map',

	entry: [
		'webpack-dev-server/client?http://127.0.0.1:8080/',
		'webpack/hot/only-dev-server',
		'./src'
	],

	// The path that webpack will place the bundled app into
	output: {
		 path: path.join(__dirname, 'public'),
		 filename: 'bundle.js'
	},

	// Where webpack will look for bundled files
	resolve: {
		modules: ['node_modules', 'src'],
		extensions: ['.js', '.scss']
	},

	// Define loaders
	module: {
		rules: [
		  {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			// We can use query here because we have only 1 loader
			query: { presets: ['es2015'] }
		  },
		  // Loader for HTML files
		  {
			test: /\.html$/,
			loader: 'raw-loader'
		  },
		  // Loader for SCSS files (SASS)
		  {
			test: /\.scss$/,
			loader: [
				'style-loader',
				'css-loader',
				'autoprefixer-loader?browsers=last 3 versions',
				'sass-loader?outputStyle=expanded'
			]
		  }
		]
	},

	// Plugins required to load webpack dev server
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	],

	devServer: {
		hot: true,
		// Route all unknown paths to a backend on port 3000 (connecting node & webpack servers)
		proxy: {
			'/': 'http://localhost:3000'
		}
	}
};