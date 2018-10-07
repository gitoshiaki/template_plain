const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    mode: 'production',
    // mode: "development",
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    entry: {
        'app': ['./src/js/entry.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.browser': 'true'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/template/page/top.pug'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                    }
                }
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: [
                                require('autoprefixer')({ grid: true })
                            ]
                        },
                    },
                    {
                        loader: 'stylus-loader',
                        options: {
                            paths: 'node_modules/bootstrap-stylus/stylus/'
                        }
                    }
                ]
            }
        ]
    }
};