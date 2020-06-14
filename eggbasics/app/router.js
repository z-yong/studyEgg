'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/news', controller.news.index);
  router.get('/newsList/:id', controller.news.newsList);
};


/**
 * MVC框架:
 *  view: 视图 模板 页面的展示
 *  controller: 控制器 负责处理一些简单的业务逻辑
 *  model: 和数据打交道 查询数据库 操作数据库数据 请求数据 复杂业务逻辑
 */
