const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./common.js');
const path = require('path');
const clean = require('clean-webpack-plugin');
const scss = require("extract-text-webpack-plugin");
const copy = require('copy-webpack-plugin');
const imagemin = require('imagemin-webpack-plugin').default;
const purify = require('purifycss-webpack');

module.exports = function (env) {
    return webpackMerge(commonConfig(env), {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: scss.extract({
                        use: [{
                            loader:"css-loader",
                            options: { importLoaders: 1 }
                        },{
                            loader:"postcss-loader"
                        }, {
                            loader:"sass-loader"
                        }],
                        fallback: "style-loader"
                        }
                    )
                }
            ]
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: true, 
                debug: false
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new clean([
                'dist/.*', 'dist/*'
            ], {
                root: path.join(process.cwd(), './dist')
            }),
            new scss('main.css'),
            new copy([
                {
                    from: path.join(process.cwd(), './src/assets'),
                    to: 'assets'
                }
            ]),
            new webpack
                .optimize
                .UglifyJsPlugin({
                    beautify: false,
                    compress: {
                        warnings: false,
                        drop_console: true
                    },
                    comments: false
                }),
            new imagemin({test: '**'}),
            new purify({
                paths: [path.join(process.cwd(), './src/pug/includes/body.pug')],
                minimize: true
            })
        ]
    })
}