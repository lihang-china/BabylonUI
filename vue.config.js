/*
 * @Descriptin:
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-06-02 15:51:13
 * @LastEditors: Your Name
 * @LastEditTime: 2022-06-02 15:51:24
 */
var webpack = require("webpack");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      AMap: "AMap", // 高德地图配置
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
    optimization: {
      // 这个配置项是对打包流程进行优化的配置
      splitChunks: {
        //
        cacheGroups: {
          //
          // 外部也可以进行配置，当内部配置不与外部配置冲突的时候，使用内部内部配置，不冲突时，共用。
          commons: {
            test: /[\\/]node_modules[\\/]/, // 配置是一个正则，所以引入来自node_modules文件夹里面的文件，都会打包成一个vendors.js文件
            name: "node", // 打包之后，文件的名字
            chunks: "initial", // 不同导入方式进行配置
          },
        },
      },
    },
  },
  assetsDir: "static",
  publicPath: "./",
  css: {
		loaderOptions: {
			postcss: {
				plugins: [
					require('postcss-plugin-px2rem')({
						rootValue: 192, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
						unitPrecision: 5, //允许REM单位增长到的十进制数字。
						//propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
						// propBlackList: [], //黑名单
						exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
						// selectorBlackList: [], //要忽略并保留为px的选择器
						// ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
						// replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
						mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
						minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
					}),
				]
			}
		}
	},
};
