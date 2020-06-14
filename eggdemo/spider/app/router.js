'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.home.login);
  router.get('/getid', controller.home.getId);
  router.get('/news', controller.news.index);
};
/**
 * egg-init spider --type=simple
 * cnpm install
 * cnpm install egg-view-ejs -S
 * 在plugin.js中配置ejs
 * 在config.default.js中配置模板引擎
 */
