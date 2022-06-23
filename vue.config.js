/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-06-02 15:51:13
 * @LastEditors: Your Name
 * @LastEditTime: 2022-06-02 15:51:24
 */
var webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
module.exports = {
    productionSourceMap: false,
    configureWebpack: {
        externals: {
            'AMap': 'AMap' // 高德地图配置
        },
        plugins: [
            // new CompressionWebpackPlugin({
            //     test: /\.(js|css)(\?.*)?$/i, //需要压缩的文件正则
            //     threshold: 10240, //文件大小大于这个值时启用压缩
            //     deleteOriginalAssets: false //压缩后保留原文件
            // }),
            // new webpack.optimize.LimitChunkCountPlugin({
            //     maxChunks: 6,
            // }),
        ],
        optimization: { // 这个配置项是对打包流程进行优化的配置
            splitChunks: { // 
                cacheGroups: { //
                    // 外部也可以进行配置，当内部配置不与外部配置冲突的时候，使用内部内部配置，不冲突时，共用。
                    commons: {
                        test: /[\\/]node_modules[\\/]/, // 配置是一个正则，所以引入来自node_modules文件夹里面的文件，都会打包成一个vendors.js文件
                        name: "node", // 打包之后，文件的名字
                        chunks: "initial" // 不同导入方式进行配置
                    }
                }
            }
        }
    },
    assetsDir: 'static',
    publicPath: './'

}