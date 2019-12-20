## 移动web开发适配Rem (适合响应式设计和简单的移动端适配)
### 1、浏览器的默认字体高度都是16px
### 2、目前IE9+，Firefox,chrome,safari,opera的主流版本都支持rem
### 3、rem是只相对于根元素html的font-size，即只需要设置根元素的font-size，其他元素使用rem单位设置成相应的百分比即可
### 4、使用%单位方便使用，css中的body中先全局声明font-size=62.5%,因为100%=16px,1px=6.25%,所以10px=62.5%;这里的1rem=10px,所以12px=1.2rem,px与rem的转换通过10就可以得到
### 5、使用rem作为单位，可以在不同设备下能保存一致的网页布局，使用rem布局结合在html上根据不同分辨率设置不同font-size有很多不好解决的麻烦，网易是如何解决的呢？最根本的原因在于，网易页面上html的font-size不是预先通过媒介查询在css里定义好的，而是通过JS计算出来的，所以当分辨率发生变化时，html的font-size就会变，不过这得在你调整分辨率后，刷新页面才能看得到效果。你看代码就知道为啥font-size是直接写到html的style上面的了
### 6、根据什么计算的，这就跟设计稿有关了，拿网易来说，它的设计稿应该是基于iphone4或者iphone5来的，所以它的设计稿竖直放时的横向分辨率为640px，为了计算方便，取一个100px的font-size为参照，那么body元素的宽度就可以设置为width: 6.4rem，于是html的font-size=deviceWidth / 6.4。这个deviceWidth就是viewport设置中的那个deviceWidth。根据这个计算规则，可得出本部分开始的四张截图中html的font-size大小如下：
```
deviceWidth = 320，font-size = 320 / 6.4 = 50px
deviceWidth = 375，font-size = 375 / 6.4 = 58.59375px
deviceWidth = 414，font-size = 414 / 6.4 = 64.6875px
deviceWidth = 500，font-size = 500 / 6.4 = 78.125px
```
### 7、（1）先拿设计稿竖着的横向分辨率除以100得到body元素的宽度：
如果设计稿基于iphone6，横向分辨率为750，body的width为750 / 100 = 7.5rem
如果设计稿基于iphone4/5，横向分辨率为640，body的width为640 / 100 = 6.4rem
```
//定义一个变量和一个mixin less
@baseFontSize: 75;//基于视觉稿横屏尺寸/100得出的基准font-size
.px2rem(@name, @px){
    @{name}: @px / @baseFontSize * 1rem;
}
//使用示例：
.container {
    .px2rem(height, 240);
}
//less翻译结果：
.container {
    height: 3.2rem;
}

// 定义一个计算函数sass
$rem: 37.5px;
@function px2rem($px) {
  @return ($px / $rem)+rem;
}
```
### 解释一下就是：

第一步，视觉设计阶段，设计师按宽度750px（iphone 6）做设计稿，除图片外所有设计元素用矢量路径来做。设计定稿后在750px的设计稿上做标注，输出标注图。同时等比放大1.5倍生成宽度1125px的设计稿，在1125px的稿子里切图。

第二步，输出两个交付物给开发工程师：一个是程序用到的@3x切图资源，另一个是宽度750px的设计标注图。

第三步，开发工程师拿到750px标注图和@3x切图资源，完成iPhone 6（375pt）的界面开发。此阶段不能用固定宽度的方式开发界面，得用自动布局（auto layout），方便后续适配到其它尺寸。

第四步，适配调试阶段，基于iPhone 6的界面效果，分别向上向下调试iPhone 6 plus（414pt）和iPhone 5S及以下（320pt）的界面效果。由此完成大中小三屏适配。

注意第三步，就要使用我们以上介绍的网易跟淘宝的适配方法了。假如公司设计稿不是基于750的怎么办，其实很简单，按上图做一些相应替换即可，但是流程和方法还是一样的。解释一下为什么要在@3x的图里切，这是因为现在市面上也有不少像魅蓝note这种超高清屏幕，devicePixelRatio已经达到3了，这个切图保证在所有设备都清晰显示。
