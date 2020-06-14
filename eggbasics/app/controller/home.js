'use strict';

const Controller = require('egg').Controller;
  
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = 'hi, egg';
    // 调用service中的方法
    // 注意 这里如果方法是异步的需要加上await
    const data = await ctx.service.home.getHomeData()
    await ctx.render('home.ejs', data)
  }
}

module.exports = HomeController;