/**
 * 全局引用mixin  
 * 变量请使用首字母大写
 * 方法请使用_开头
 */
import cookie from '@util/cookie.js'

export default {
  data() {
    return {

    }
  },
  computed: {
  },
  methods: {
    ...cookie
  }
}