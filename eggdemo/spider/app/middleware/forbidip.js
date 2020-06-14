
module.exports = (options, app) => {
    // 要屏蔽的ip可以从数据库获取也可以
    return async (ctx, next) => {
        // 在前往任何路由前 都会调用一次中间件
        // const ips = ['127.0.0.1'];//从数据库获取
        const ips = options.forbidipList;
        const flag = ips.some(item => {
            if(item === ctx.ip){
                return true;
            }
        })
        if(flag){
            ctx.status = 403;
            ctx.body = '您的ip已被屏蔽'
        }else{
            await next();
        }
    }
}