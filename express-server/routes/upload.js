var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var UPLOAD_FOLDER = '/avatar/';


router.get('/',function(req,res){
	res.render('upload',{title:'图片上传'})
});

//上传文件
router.post('/',function(req,res){
	var form = new formidable.IncomingForm();//创建上传表单
	form.encoding = 'utf-8';
	form.uploadDir = 'public'+UPLOAD_FOLDER; //设置上传目录
	form.keepExtensions = true; //保留后缀
	form.maxFieldsSize = 2*1024*1024;//文件大小

	form.parse(req,function(err,fields,files){
		if(err){
			res.locals.error = err;
			res.render('upload',{title:'图片上传'})
			return;
		}
		var extName = '';// 后缀名
		switch(files.fulAvatar.type){
			case 'image/pjpeg':
			extName = 'jpg';
			break;
			case 'image/jpeg':
			extName = 'jpg';
			break;         
			case 'image/png':
			extName = 'png';
			break;
			case 'image/x-png':
			extName = 'png';
			break;    
		}

		if(extName.length == 0){
			res.locals.error = '只支持png和jpg格式图片';
			res.render('index', { title: '图片上传' });
			return;                   
		}

		var avatarName = Math.random()+'.'+extName;
		var newPath = form.uploadDir+avatarName;
		console.log("--",newPath);
		console.log("===",files.fulAvatar.path);
		fs.renameSync(files.fulAvatar.path,newPath); //重命名
	});
		res.locals.success = '上传成功';
		res.render('upload',{title:'图片上传'})
});

module.exports = router;
