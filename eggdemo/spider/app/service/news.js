'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
  async getNewsList() {
    const url = this.config.api+'/appapi.php?a=getPortalList&catid=20&page=1';
    const result = await this.ctx.curl(url);//拿到的数据类型是Buffer
    const data = JSON.parse(result.data)
    // 调用application扩展方法
    console.log(this.app.foo())
    // 调用context扩展方法
    console.log(this.ctx.foo())
    // 调用helper扩展方法
    console.log(this.ctx.helper.foo())
    
    return data
  }
}

module.exports = NewsService;
