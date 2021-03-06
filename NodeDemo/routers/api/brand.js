//login@regist
const express = require('express');
const router = express.Router()
const brand = require('../../models/brand')

const multer = require('multer')

const passport = require('passport');

const { session } = require('passport');

//@router get api/brand/text
//@desc 返回的请求的json数据
//@access public
router.get('/text',(req,res)=>{
  res.json({mes:'text'})
})


//@router podt api/brand/add
//@desc 存入json数据
//@access public
router.post("/add",(req,res)=>{
  brand.findOne({
    name:req.body.name
  }).then(ret=>{
    if(!ret){
      console.log(ret);
      const newbrand =new brand({})
      const imgurl = 'http://localhost:3000/img/'
      if(req.body.name) newbrand.name = req.body.name;
      if(req.body.num) newbrand.num = req.body.num;  
      if(req.body.imgurl) newbrand.imgurl = imgurl+req.body.imgurl;  
      if(req.body.shopname) newbrand.shopname = req.body.shopname;
      if(req.body.start) newbrand.start = req.body.start;
      if(req.body.price) newbrand.price = req.body.price;
      newbrand.save().then(brand=>{
        res.json(brand)
        res.status(200).json({mes:`成功加入购物车了`})
      })
    }else{
      // console.log(ret.name);      
      return  res.status(200).json({mes:`${ret.shopname}的${ret.name}之前已经在购物车了哟`})
    }

  })

})








//@router get api/brand/getallmes
//@desc 获取所有的json数据
//@access private
router.get("/getallmes",(req,res)=>{
  brand.find().then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有任何内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})



//@router get api/brand/:id
//@desc 获取单个json数据
//@access public
router.get("/:id",(req,res)=>{
  brand.findOne({_id:req.params.id}).then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})



//@router podt api/brand/edit
//@desc 编辑json数据
//@access public
router.post("/edit/:id",(req,res)=>{


  const newbrand =new brand({})
  const imgurl = 'http://localhost:3000/img/'
  if(req.body.name) newbrand.name = req.body.name;
  if(req.body.num) newbrand.num = req.body.num;  
  if(req.body.imgurl) newbrand.imgurl = imgurl+req.body.imgurl;  
  if(req.body.shopname) newbrand.shopname = req.body.shopname;
  if(req.body.start) newbrand.start = req.body.start;
  if(req.body.price) newbrand.price = req.body.price;

  brand.findByIdAndUpdate(
    {_id:req.params.id},
    {$set:newbrand},
    {new:true}
  ).then(brand=>{
    res.json(brand)
  })
})


//@router post api/brand/deconste/:id
//@desc 删除json数据
//@access public
router.delete("/deldete/:id",(req,res)=>{
  brand.findOneAndRemove({_id:req.params.id}).then(mes=>{
    if (mes) {
      mes.save().then(brand=>res.json(brand))
    }else{
      res.status(404).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})





// var projectInfo = require('../projectInfo.json')
// let PictureStore = require(PROXY).pictureStore
 
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/upload')
//   },
//   filename: function (req, file, cb) {
//     var str = file.originalname.split('.')
//     cb(null, Date.now() + '.' + str[1])
//   }
// })
// var upload = multer({storage: storage})
 
// // 上传图片到图片仓库并返回上传的图片路径
// router.post('/uploadImgs', upload.array('file', 20), function (req, res, next) {
//   var arr = []
//   for (var i in req.files) {
//     arr.push(global.SERVICEADDRESS + '' + req.files[i].filename)
//   }
//   if (req.body.storeId) {
//     PictureStore.updateOnePictureStore({_id: req.body.storeId}, {$addToSet: {pictureimgurlArr: {$each: arr}}}, (err, data) => {
//       res.json({
//         code: 200,
//         data: arr
//       })
//     })
//   } else {
//     PictureStore.updateOnePictureStore({isCommon: true}, {$addToSet: {pictureimgurlArr: {$each: arr}}}, (err, data) => {
//       res.json({
//         code: 200,
//         data: arr
//       })
//     })
//   }
// })







module.exports = router
