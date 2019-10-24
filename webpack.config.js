const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
//const env = require('dotenv').config();
const webpack = require('webpack');
//const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); 
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        alias: {
          'super-helpers': path.resolve(__dirname, './src/helpers')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/, use: [
                (isDev ? 'style-loader' : {
                    loader: MiniCssExtractPlugin.loader, 
                    options: {
                        publicPath: '../' 
                    }
                }),
                'css-loader', 
                'postcss-loader'
                ] 
            },
            {
                test: /\.(png|jpe?g|gif|ico|svg)$/i,
                use: [
                  'file-loader?name=./images/[name].[ext]',
                  {
                    loader: 'image-webpack-loader',
                    options: {
                      bypassOnDebug: true,
                      disable: true
                    }
                  }
                ]
              },
              {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=./fonts/[name].[ext]'
              }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css'
        }),
        new HtmlWebpackPlugin({ 
            inject: false,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new WebpackMd5Hash(),
        new WebpackMd5Hash.DefinePlugin({

        })
    ]
};