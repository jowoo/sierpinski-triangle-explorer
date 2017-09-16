const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./common.js');

module.exports = function(env) {
    return webpackMerge(commonConfig(env), {
        devtool: 'cheap-module-source-map',
        devServer: {
            publicPath: "/",
            contentBase: "./src",
            port: 7777,
            host: 'localhost',
            historyApiFallback: true,
            noInfo: false,
            stats: 'errors-only',
            hot:true
        },
        module: {
            rules: [{
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('development')
                }
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
        ],
    });
}