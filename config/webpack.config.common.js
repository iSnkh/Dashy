'use strict';

const VueLoaderPlugin      = require('vue-loader/lib/plugin');
const HtmlPlugin           = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin    = require('copy-webpack-plugin');
const helpers              = require('./helpers');
const isDev                = process.env.NODE_ENV === 'development';

const webpackConfig = {
    entry: {
        polyfill: '@babel/polyfill',
        main: helpers.root('app', 'app')
    },
    resolve: {
        extensions: [ '.js', '.json', '.vue', '.scss', '.css' ],
        alias: {
            'vue$': isDev ? 'vue/dist/vue.runtime.js' : 'vue/dist/vue.runtime.min.js',

            '@': helpers.root('app'),
            '@pages': helpers.root('app/pages'),
            '@components': helpers.root('app/components'),

            '~': helpers.root('app/resources'),
            '~style': helpers.root('app/resources/scss'),
            '~components': helpers.root('app/resources/scss/components')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: [ helpers.root('app') ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [ helpers.root('app') ]
            },
            {
                test: /\.css$/,
                use: [
                    isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                ]
            },
            {
                test: /\.sc|ass$/,
                use: [
                    isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                    { loader: 'sass-loader', options: { sourceMap: isDev } },
                    { loader: 'resolve-url-loader' }
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash].[ext]'
                }
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                 'file-loader',
                 { loader: 'image-webpack-loader' },
                ],
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlPlugin({ template: 'index.html', chunksSortMode: 'dependency' }),
        new CopyWebpackPlugin([
            {from:'app/resources', to:'./'} 
        ])
    ]
};

module.exports = webpackConfig;
