import axios from 'axios'
import urlTool from '@/util/url'
import Vue from 'vue'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import cookie from '@util/cookie.js'
nprogress.configure({
    showSpinner: false
})

// 通用配置
const baseURL = ['', '.', './'].indexOf(process.env.BASE_URL) + 1 ? location.pathname : process.env.BASE_URL
const config = {
    // baseURL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        'x-csrf-token': cookie.getCookie('csrfToken')
    },
    timeout: 15e3,
    error: true,
}

/**
 * ajax请求
 * @param {*} opt 
 */
const ajax = async(opt) => {
    if (opt.nprogress === undefined) {
        nprogress.start()
        nprogress.inc(0.6)
    }
    try {
        var resp = await axios({
            ...config,
            ...opt,
        })
        nprogress.done()
        resp.data && resp.data.fail && handleError(resp.data)
        return resp.data
    } catch (error) {
        nprogress.done()
        let msg = {
            fail: true,
            code: '504',
            msg: '服务器出故障了~',
        }
        handleError(msg)
        return msg
    }
    // 自动处理错误
    function handleError(err) {
        if (opt.error === undefined) return Vue.prototype.$message.error(err.msg)
        typeof opt.error == 'function' && opt.error(err)
    }
}

/**
 * 提交get请求
 * @param {*} url 
 * @param {*} params
 * @param {*} opt 
 */
ajax.get = (url, params, opt) => {
    return ajax({
        ...opt,
        url,
        params,
        method: 'get'
    })
}
let header = {
    'Content-Type': 'application/json',
    'x-csrf-token': cookie.getCookie('csrfToken')
}
function post(url, data, opt, header){
    return ajax({
        ...opt,
        method: 'post',
        headers: header,
        url,
        data,
    })
}

/**
 * 提交post请求
 * @param {*} url 
 * @param {*} data 
 * @param {*} opt 
 */
ajax.postForm = (url, data, opt) => {
    const fromData = typeof data == 'string' ? data : urlTool.encode(data)
    return post(url, fromData, opt, header)
}

/**
 * 提交json请求
 * @param {*} url 
 * @param {*} data 
 * @param {*} opt 
 */

ajax.post = (url, data, opt) => {
    return post(url, data, opt, header)
}

/**
 * ajax上传文件请求
 * @param {*} url 
 * @param {*} data 
 * @param {*} opt 
 */
ajax.postFile = (url, data, opt) => {
    let formData = new FormData()
    for (let key in data) {
        formData.append(key, data[key])
    }
    const header = {
            'Content-Type': 'multipart/form-data',
            'x-csrf-token': cookie.getCookie('csrfToken')
        }
    return post(url, formData, opt, header)
}


export default ajax