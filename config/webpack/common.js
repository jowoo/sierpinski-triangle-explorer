const webpack = require('webpack');
const path = require('path');
const html = require('html-webpack-plugin');

module.exports = function() {

    return {
        entry: {
            vendor: [],
            main: ['./src/scripts/app.js', './src/sass/app.scss'],
        },
        output: {
            path: path.resolve('dist'),
            filename: '[name].js'
        },
        module: {
            rules: [{
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                exclude: [/fonts/, /node_modules/],
                use: 'file-loader?name=[name].[ext]&outputPath=fonts/',
            }, {
                test: /\.pug$/,
                use: 'pug-loader'
            }, {
                test: /\.(gif|png|jpe?g|svg)$/i,
                exclude: [/fonts/, /node_modules/],
                use: [
                    'file-loader?name=[name].[ext]&outputPath=assets/'
                ]
            }],
        },
        plugins: [
            new webpack.ProvidePlugin({
                
            }),
            new html({
                template: path.resolve('./src/pug/page.pug'),
                filename: 'index.html',
                title: 'sierpinski-triangle-explorer'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: ["vendor"],
                minChunks: Infinity,
            })
        ]
    };
    
}