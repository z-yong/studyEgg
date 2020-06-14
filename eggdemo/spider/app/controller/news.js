'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async index() {
    const { ctx } = this;
    const data = await this.service.news.getNewsList();
    // 获取cookie
    // console.log('password',ctx.cookies.get('password'))
    // // 清除cookie
    // ctx.cookies.set('username',null)
    // 获取session
    console.log('session',ctx.session.username)
    console.log('session',ctx.session.userInfo)
    ctx.body = data
  }
}

module.exports = NewsController;
