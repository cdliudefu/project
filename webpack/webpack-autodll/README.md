## 说明
- 截止目前1/4/2020，autodll-webpack-plugin 对html-webpack-plugin不能自动插入
- 对html-webpack-plugin降级为3.x
## autodll-webpack-plugin
- 类似webpack自带的Dllplugn和DllReferencePlugin的作用，即对依赖的第三方库，比如vue,react在打包的时候，不会对这些库进行打包进文件，这样可以快速的提高打包的数度
- 与html-webpack-plugin插件协同，它能自动引入进去，节省了手动将DLL包添加到自己的html中
