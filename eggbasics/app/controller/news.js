'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = 'hi, news';
        // 获取get传值
        console.log(ctx.query)
    }
    async newsList() {
        const { ctx } = this;
        ctx.body = 'hi, newsList';
        // 获取动态路由传值
        console.log(ctx.params)
    }
}

module.exports = NewsController;
/**
 * {
    "breadcrumbs.enabled": true,
    "editor.renderWhitespace": "all",
    "editor.renderControlCharacters": true,
    "window.zoomLevel": 0,
    "files.associations": {
        "*.cjson": "jsonc",
        "*.wxss": "css",
        "*.wxs": "javascript"
    },
    "emmet.includeLanguages": {
        "wxml": "html"
    },
    "minapp-vscode.disableAutoConfig": true,
    "editor.fontSize": 16,
    "workbench.statusBar.visible": false,
    "php.validate.executablePath": "c:\\wamp64\\bin\\php\\php7.3.5\\php.exe",
    "files.autoSave": "off",
    "eslint.codeAction.disableRuleComment": {
    
    },
}
 */
