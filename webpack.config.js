const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: './src/js/controller.js',
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
        // path: path.resolve(__dirname, 'dist'),
        // filename: '[name].js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        // options: { minimize: true },
                    },
                ],
            },
            {
                test: /\.svg$/,
                loader: 'file-loader',
                // use:
                // 	{
                // 		loader: 'file-loader',
                // 		options: {
                // 			name: '[name].[ext]',
                // 			output: 'img/',
                // 			publicPath: 'img/'
                // 		}
                // 	},
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new HtmlWebPackPlugin({
            filename: './index.html',
            template: './src/index.html',
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
};
