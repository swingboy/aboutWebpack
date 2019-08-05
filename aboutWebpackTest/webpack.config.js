let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
let ResultPlugin = require('./src/plugins/ResultPlugin');
let BannerPlugin = require('./src/plugins/BannerPlugin')
let ProgressTt = require('./src/plugins/ProgressTt')
let AllHooks = require('./src/plugins/AllHooks');
let webpack = require('webpack');
module.exports = {
    // devtool: 'eval-source-map',
    mode: 'development',
    entry: path.join(__dirname, './src/app.js'),
    output: {
        path: path.join(__dirname, "dist"),
        filename: '[name]_[chunkhash:4].js'
    },


    // use: [
    //     { loader: 'style-loader' },
    //     {
    //       loader: 'css-loader',
    //       options: {
    //         modules: true
    //       }
    //     }
    //   ]
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['testALoader', 'babelLoader']
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            // use: [MiniCssExtractPlugin.loader, 'styleLoader', 'css-loader']
            // use: [MiniCssExtractPlugin.loader, 'css-loader']
            // use: [MiniCssExtractPlugin.loader, 'css-loader']

            // ok test
            use: ['styleLoader', 'css-loader']
        }]
    },

    resolveLoader: {
        modules: [path.join(__dirname, './src/loaders'), 'node_modules']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'i am test~',
            template: './index.html',
            filename: './index.html',
            chunks: [''],
            inject: true,
        }),
        new MiniCssExtractPlugin({filename: '[name]_[chunkhash:4].css' }),

        new ResultPlugin((stat) => {
            console.log('success......', stat);
        }, (err) => {
            console.log('errr......', err);
        }),
        new BannerPlugin(),
          
        new webpack.ProgressPlugin((percentage, message, ...args) => {
            // e.g. Output each progress message directly to the console:
            console.info(percentage, message);
        }),

        new AllHooks(),
    ]
}