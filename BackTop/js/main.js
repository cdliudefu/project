/**
 * Created by lWX314826 on 2018/9/17.
 */
(function(w){
  w.onload = function(){
    var doc = document.documentElement || document.body;
    var BackTop = document.getElementById('backTop');
    // 获取页面可视区域高度
    var clientHeight = doc.clientHeight;
    var timer = null;
    var isTop = true;
    
    //绑定滚动条事件
    w.onscroll = function(){
      var stop = doc.scrollTop;
      if(stop>=clientHeight){
        BackTop.style.display = 'block'
      }else{
        BackTop.style.display = 'none';
      }
      
      if(!isTop){
        clearInterval(timer);
      }
      isTop = false;
    }
    
    // top对象点击事件
    BackTop.onclick = function(){
      // 避免二次点击重新触发定时器
      clearInterval(timer);
      
      timer = setInterval(function(){
        // 得到浏览器滚动条距离顶部的高度
        var stop = doc.scrollTop;
        // 创建滚动条的速度
        var speed = Math.floor(stop / 10) +1;
        console.log('==speed=',stop,speed)
        // 重新为滚动条距离顶部的高度赋值
        doc.scrollTop = stop - speed;
        // 为isTop重新赋值
        isTop = true;
        // 当滚动条距离顶部高度为0时，清除定时器
        if(stop==0){
          clearInterval(timer);
          console.log('回到顶部')
        }
      },30)
    }
    
  }
})(window);
