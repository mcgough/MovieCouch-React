const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './client/index.html',
	inject: 'body'
});
console.log('###########!!!!!!!!!############');
module.exports = {
	entry: './client/index.js',
	output: {
		path: './client/dist',
		filename: 'index_bundles.js'
	},
	module: {
		loaders: [
			{test: /\.js$/, loader: 'babel-loader', exclude: '/node_modules/'},
			{test: /\.jsx$/, loader: 'babel-loader', exclude: '/node_modules/'}
		]
	}
};