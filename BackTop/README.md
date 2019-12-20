# 置顶按钮功能
index.html:运用纯js做了置顶
```
备注：
1、兼容性：  var doc = document.documentElement || document.body;
2、计算浏览器的可视区域：doc.clientHeight
3、滚动条事件：doc.scrollTop
4、动画：setInterval 计算用滚动条距离顶部的距离来做路径的运行动画
```
jqindex.html:运用了jquery实现的置顶
```
1、动画事件：animate
btn.on('click', function () {
  $('html, body').animate({
    scrollTop: 0
  }, 800)
});
2、计算滚动条高度：
$(window).height()
3、淡入淡出隐藏和显示
fadeOut()
fadeIn()

```
