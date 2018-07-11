const ROOT_PATH = __dirname
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index/index.js',
    mode: 'development',
    devServer: {
        port: 8099,
        historyApiFallback: true,
        proxy: {
            // 请求到 '/device' 下 的请求都会被代理到 target： http://debug.xxx.com 中
            '/zboxService/*': {
                target: 'http://localhost:8012',
                secure: false, // 接受 运行在 https 上的服务
                changeOrigin: true
            }
        },
        inline: true,//注意：不写hot: true，否则浏览器无法自动更新；也不要写colors:true，progress:true等，webpack2.x已不支持这些
    },
    output: {
        path: path.join(__dirname, 'dist'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        filename: "bundle.js"
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
            '@': ROOT_PATH + '/src'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            // vue模板加载
            {
                test: /\.vue$/,
                loader: 'vue-loader'/*,
             options: {
             extractCSS: true
             } */
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=1&name=./static/img/[hash].[ext]'
            },
            {
                test:/\.ico$/,
                loader:  'url-loader?limit=1&name=./[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery"
        }),
        new HtmlWebpackPlugin({
            template: 'src/index/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
}