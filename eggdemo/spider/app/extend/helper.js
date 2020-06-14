// 此文件中写的方法可以在外部直接用this.ctx.helper进行调用
module.exports = {
    // 这里面的this就是ctx.helper本身
    foo(param) {
        return this.foo2()
      // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
    },
    foo2(){
        return '我是helper中的数据'
    }
  };