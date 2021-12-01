const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/ts/controller.ts',

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
                test: /\.ts$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'ts-loader',
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
                test: /\.(png|svg|jpe?g|gif)$i/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            output: 'img/',
                            publicPath: 'img/',
                        },
                    },
                ],
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
