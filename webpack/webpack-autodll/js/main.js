require('../styles/main.styl')

const $ = require('jquery')
$('#app').html('欢迎光临，测试autodll')
console.log('这是主函数main.js')

require('./demo1.js')
