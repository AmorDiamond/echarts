// 全局配置
require.config({
  // 根路径设置，paths下面全部都是根据baseUrl的路径去设置
  baseUrl:'/lib/js/',
  paths:{
    // 引入jQuery
    jquery: 'jquery.2.0.0.min',
    bootstrap: 'bootstrap/js/bootstrap.min.js',
    echarts: 'echarts',
    echarts3: 'echarts.min.3.8.5',
    echartsConfig: 'echarts.config',
    commonEditor: 'common.editor',
    common: 'common',
    httpRequest: 'http.request',
    ace: 'ace',
    echartsLiquidFill: 'echarts-liquidfill.min',
    echartsGl: 'echarts-gl.min',
  },
  // 用来配置不兼容的模块，意思是：该模块没有module.exports,
  // jquery就有module.exports输出值
  shim:{
    //bootstrap没有module.exports输出值，所以得放在shim
    bootstrap:{
      //bootstrap需要依赖jquery，所以得加deps
      deps:["jquery"]
      // 如果该模块加载进来，需要输出一个值，那就用exports来设置，这里不用设置
      // exports:''
    }
  },
  //map"告诉RequireJS在任何模块之前，都先载入这个模块
  map: {
    // 这里没有设置，举个例子
    // '*': {
    // 'css': 'plugins/require-css/css'
    // }
  }
})