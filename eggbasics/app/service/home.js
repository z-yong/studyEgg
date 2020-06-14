'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async getHomeData() {
    const title = 'Home';
    const list = ['你','我', '他'];
    // console.log(this.config.api)//可以直接调用
    return { title, list }
  }
}

module.exports = HomeService;
