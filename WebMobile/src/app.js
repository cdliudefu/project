/**
 * Created by lWX314826 on 2018/8/20.
 */
require('./reset.css');
require('./index.less');

let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
let htmlDOM = document.getElementsByTagName('html')[0];
htmlDOM.style.fontSize = htmlWidth/10+'px';

function bindEvent(dom,event,callback) {
  if(dom.addEventListener){
    dom.addEventListener(event,callback,false);
  }else{
    dom.attachEvent('on'+event,callback);
  }
}

bindEvent(window,'resize',(e)=>{
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  console.log('--htmlWidth-',htmlWidth)
  htmlDOM.style.fontSize = htmlWidth/10+'px';
})
