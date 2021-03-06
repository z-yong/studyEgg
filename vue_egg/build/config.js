module.exports = {
    // 开发环境配置
    dev: {
        // 本地server的host，为空时默认自动获取本机ip
        host: '127.0.0.1',
        // 本地server端口
        port: 3000,
        // 代理配置
        proxy: {
            '/': 'http://127.0.0.1:7001',
        },
        baseUrl: './api',
        // mock数据请求前辍,请在/mock中配置json数据，不启用请设为false
        mock: '/mock',
        // 是否启用热更新
        hot: true,
        // 打包输出目录
        dist: '../dist',
        cssFile: false,
    },
    // 生产环境配置，可在其他配置中覆盖
    prod: {
        // 根url，于ajax请求路径前辍定义
        baseUrl: '',
        // cnd地址，同output.publicPath
        cdnUrl: '.',
        // 打包输出目录
        dist: '../dist',
        // 是否将vue文件中的css提取到单独css文件中
        cssFile: true,
        // px2rem自动转换, 如 100px => 1rem
        // px2rem: 100,
        // 入口页路径
        root: '',
        // 自定义环境变量，使用process.env.NAME访问
        env: {},
        // 部署配置
        deploy: {
            host: '127.0.0.1',
            username: 'root',
            port: 22,
            password: 'root',
            remoteDir: '/www/web'
        }
    },
    // 测试环境配置
    test: {}
}