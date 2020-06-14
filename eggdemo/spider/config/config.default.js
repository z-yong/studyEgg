/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1592051927075_5990';

  // add your middleware config here
  config.middleware = [];

  // 配置ejs模板引擎
  config.view = {
    mapping: {
      '.ejs': 'ejs'
    }
  }
// 关闭egg内置安全系统 不推荐
//   config.security = {
//     csrf = {
//       enable: false,
//     }
//  }
// 每次请求的时候 egg 会帮我们验证一次安全系统
config.security= {
  csrf : {
    headerName: 'x-csrf-token',// 自定义请求头
  }
}

  // 配置公共url
  config.api = 'www.phonegap100.com'

  // 配置中间件
  config.middleware = ['intercept', 'forbidip', 'auth']
  // 给intercept中间件传入参数
  config.intercept = {
    a: 'aaaa'
  }
  // 给forbidip中间件传入参数
  config.forbidip = {
    forbidipList: [
      // '127.0.0.1' 
    ]
  }
  
  // 配置session
  config.session = {
    key: 'SESSION_ID',//设置session在cookie中的key
    maxAge: 3000,
    httpOnly: true,//flase表示允许js访问并修改 默认为true 表示js无法访问及修改
    encrypt: true,//对session进行加密
    renew: true //true表示 每次刷新页面 session将会被延期 延期时间为maxAge的时间 
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
