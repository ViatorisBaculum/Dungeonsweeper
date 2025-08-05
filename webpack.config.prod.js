const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	mode: "production",
	entry: "./src/app.ts",
	devServer: {
		static: [
			{
				directory: path.join(__dirname),
			},
		],
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
		clean: false, // Verhindert das Löschen des dist Ordners
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	plugins: [
		new CleanPlugin.CleanWebpackPlugin(),
		new CopyPlugin({
			patterns: [
				{ from: "app.css", to: "app.css" },
				{ from: "index.html", to: "index.html" },
				{ from: "res", to: "res" },
			],
		}),
	],
};
