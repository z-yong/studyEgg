'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    
    // egg有安全机制 如果想要post传值 必须传入一个参数 _csrf 此参数可以在中间件中设置全局变量
    await ctx.render('index.ejs')
  }
  getId() {
    const { ctx } = this;
    ctx.body = ctx.query
  }
  login() {
    const { ctx } = this;
    // 设置cookie
    // 需要注意的是 如果值为中文 那么必须设置encrypt为true 否则js无法获取
    // ctx.cookies.set('username', ctx.request.body.username, {
    //   maxAge: 1000 * 3600 * 24, // 有效期一天
    //   encrypt: true, //对cookie进行加密 js拿到的也就是加密cookie 可以利用Buffer解密
    //   httpOnly: false//flase表示允许js访问并修改 默认为true 表示js无法访问及修改
    // })
    // ctx.cookies.set('password', ctx.request.body.password, {
    //   encrypt: true, //对cookie进行加密 
    //   httpOnly: false
    // })
    // 设置session 是基于cookie cookie中会生成一个EGG_SESS值 其实就是session
    // 当浏览器访问服务器并发送第一次请求时, 服务器端会创建一个 session对象,生成一个类似于key value的键值对
    // 然后将key(cookie)返回给浏览器,浏览器下次访问时 会携带key(cookie)在请求头部的cookie字段中发送给服务器
    // 服务器找到对应的session(value)返回数据给浏览器
    ctx.session.username = ctx.request.body.username;
    ctx.session.userInfo = ctx.request.body;
    // 设置过期时间 默认24小时 不建议这样设置 可以在config.default.js中统一配置
    // ctx.session.maxAge = 8000;
    ctx.body = ctx.request.body
    // console.log('request', ctx.request.body)
  }
}

module.exports = HomeController;
