var express = require('express');
var router = express.Router();
var crypto = require('crypto');

router.get('/',function(req,res){
	res.render('usecrypto',{title:'加密字符串示例'});
});

router.post('/',function(req,res){
	var userName = req.param('txtUserName'),
	userPwd = req.param('txtUserPwd');
	//生成口令的散列值 createHash(algorithm)方法 ,这是利用给定的算法生成hash对象 
	var md5 = crypto.createHash('md5');  //crypto模块功能是加密并生成各种散列
	var en_upwd = md5.update(userPwd).digest('hex'); //digest([encoding])方法，计算数据的hash摘要值，encoding是可选参数，不传则返回buffer (encoding可为 'hex'、'base64'等)；当调用digest方法后hash对象将不可用；
	console.log("加密后的密码："+en_upwd);

	res.render('usecrypto',{title:'加密字符串示例'});
});


module.exports = router;
