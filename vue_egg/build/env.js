/**
 * webpack 核心配置
 */
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const autoprefixer = require('autoprefixer')
const px2rem = require('postcss-px2rem')
const merge = require('webpack-merge')
const util = require('./util.js')
const configUser = util.getConfig()

// webpack mode 转换
const Mode = {
    'dev': 'development',
    'test': 'production',
    'prod': 'production',
}[process.env.NODE_ENV] || 'production'

// scss,css共用配置 及 postcss 插件设置
const PostCssPlugins = [autoprefixer()]
configUser.px2rem && PostCssPlugins.push(px2rem({
    remUnit: configUser.px2rem
}))
const cssOptions = [
    configUser.cssFile ? {
        loader: MiniCssExtractPlugin.loader,
        options: {
            publicPath: '../../'
        }
    } : 'vue-style-loader',
    'css-loader',
    {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: PostCssPlugins
        }
    }
]


// webpack基本配置
var config = {
    mode: Mode,
    devtool: Mode === 'development' ? 'cheap-module-eval-source-map' : 'none',
    entry: {
        home: util.appResolve('entry/main.js')
    },
    output: {
        path: util.distResolve(),
        filename: 'static/js/[name].[contenthash:6].js',
        chunkFilename: 'static/js/[name].[contenthash:6].js',
        publicPath: configUser.cdnUrl.endsWith('/') ? configUser.cdnUrl : configUser.cdnUrl + '/',
    },

    // 代码分割
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 5,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 1,
                    enforce: true
                },
                element: {
                    test: /element/,
                    chunks: 'initial',
                    name: 'element',
                    priority: 2,
                    enforce: true
                }
            }
        },
    },

    // 加载器
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: cssOptions,
            },
            {
                test: /\.scss$/,
                use: cssOptions.concat([
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [util.appResolve('asset/css/_var.scss')]
                        }
                    }
                ]),
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.(png|jpeg|jpg|gif|svg|eot|svg|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        name: 'static/asset/[name].[hash:6].[ext]'
                    }
                }
            },
        ]
    },

    // 插件
    plugins: [
        new VueLoaderPlugin(),
        // 定义环境变量，可在页面直接使用
        new webpack.DefinePlugin({
            'process.env': Object.assign(configUser.env || {}, {
                BASE_URL: JSON.stringify(configUser.baseUrl),
                CDN_URL: JSON.stringify(configUser.cdnUrl),
                ENV: JSON.stringify(process.env.NODE_ENV),
            })
        }),
        // 清空编译目录
        new CleanWebpackPlugin([util.distResolve()], {
            root: util.distResolve('..'),
        }),
        // 拷贝静态文件
        new CopyWebpackPlugin([{
            from: util.rootResolve('public'),
            to: util.distResolve(),
        }]),
        // 生成html
        new HtmlWebpackPlugin({
            template: util.appResolve('entry/index.html'),
            filename: configUser.root ? configUser.root.substring(1) + '/index.html' : 'index.html',
        }),
        // 生成css
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:6].css',
            chunkFilename: 'static/css/[name].[contenthash:6].css',
        }),
        // 压缩css
        new OptimizeCssAssetsPlugin()
    ],

    // 路径别名
    resolve: {
        alias: {
            '@': util.appResolve(),
            '@asset': util.appResolve('asset'),
            '@css': util.appResolve('asset/css'),
            '@image': util.appResolve('asset/image'),
            '@util': util.appResolve('util'),
            '@component': util.appResolve('component'),
            '@service': util.appResolve('service'),
        }
    },
}

// dev环境启动本地服务
if (process.env.NODE_ENV === 'dev') {
    // 代理列表 
    var proxys = {}
    for (var key in configUser.proxy) {
        var res = {
            target: configUser.proxy[key],
            pathRewrite: {},
            changeOrigin: true
        }
        res.pathRewrite['^' + key] = ''
        proxys[key] = res
    }
    // 主机和端口
    var host = configUser.host || '0.0.0.0'
    var ip = configUser.port || 80

    config = merge(config, {
            devServer: {
                proxy: proxys,
                // app拦截请求
                before: app => {
                    configUser.mock && require('./mock')(app)
                },
                host: host,
                port: ip,
                contentBase: util.distResolve(),
                noInfo: true,
                hot: configUser.hot,
                overlay: true,
                disableHostCheck: true,
                clientLogLevel: 'error',
                watchOptions: {
                    poll: 300,
                    aggregateTimeout: 300,
                    ignored: /node_modules/
                },
            },
        })
        // 添加热更新插件，output改用hash模式
    if (configUser.hot) {
        config.plugins.push(new webpack.HotModuleReplacementPlugin())
        config.output = Object.assign({}, config.output, {
            filename: config.output.filename.replace(/contenthash/, 'hash'),
            chunkFilename: config.output.chunkFilename.replace(/contenthash/, 'hash')
        })
    }
}

module.exports = config