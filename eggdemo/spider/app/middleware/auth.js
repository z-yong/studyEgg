module.exports = () => {
    return async function auth(ctx, next){
        ctx.state.csrf = ctx.csrf; //安全header cookie csrfToken
        await next()
    }
}