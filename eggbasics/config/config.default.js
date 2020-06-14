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
  config.keys = appInfo.name + '_1591788938221_4378';

  // add your middleware config here
  config.middleware = [];

  // 配置模板引擎
  config.view = {
    mapping: {
      '.ejs': 'ejs',
    },
  };
  config.api = 'www.baidu.com'
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
