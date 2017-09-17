const webpack = require('webpack');
const path = require('path');
const html = require('html-webpack-plugin');

module.exports = function () {

    return {
        entry: {
            // vendor: [],
            main: ['./src/scripts/index.js', './src/sass/app.scss']
        },
        output: {
            path: path.join(process.cwd(), './dist'),
            filename: '[name].js'
        },
        resolve: {
            modules: ["node_modules"],
            extensions: [".ts", ".tsx", ".js", ".json", ".css", ".scss"]
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader'
                    }
                }, {
                    test: /\.(eot|svg|ttf|woff|woff2)$/,
                    use: 'file-loader?name=[name].[ext]&outputPath=fonts/'
                }, {
                    test: /\.pug$/,
                    use: 'pug-loader'
                }, {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    exclude: [
                        /fonts/, /node_modules/
                    ],
                    use: ['file-loader?name=[name].[ext]&outputPath=assets/']
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({}),
            new html({
                template: path.join(process.cwd(), './src/pug/page.pug'),
                filename: 'index.html',
                title: 'webpack, d3 & bootstrap-sass starter'
            }),
            new webpack     
                .optimize     
                .CommonsChunkPlugin({name: ["vendor"], minChunks: Infinity})
        ]
    };

}