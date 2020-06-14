
module.exports = (options, app) => {
    console.log('中间件intercept在配置中定义的参数:', options.a)
    return async (ctx, next) => { //返回一个异步的方法 不能写剪头函数
        // 在前往任何路由前 都会调用一次中间件
        console.log(new Date())
        await next()  
    }
}