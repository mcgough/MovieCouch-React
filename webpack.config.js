const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './client/index.html',
	inject: true
});

module.exports = {
	entry: './client/index.js',
	output: {
		path: path.resolve('dist'),
		filename: 'index_bundles.js'
	},
	module: {
		loaders: [
			{test: /\.js$/, loader: 'babel-loader', exclude: '/node_modules/'},
			{test: /\.jsx$/, loader: 'babel-loader', exclude: '/node_modules/'}
		]
	},
	plugins: [HtmlWebpackPluginConfig]
};