const mysql = require('mysql');
const ejs = require('ejs');
const fs = require('fs');
const config = require('./config');
const db = mysql.createConnection(config.db);
db.connect(function(err){if(err){throw err;}});
//渲染首页
exports.index = function (req,res){
  db.query('select * from videoList',(err,result)=>{
    if(err){throw err;}
    res.set('Content-Type','text/html');
    res.send(ejs.render(fs.readFileSync("./views/index.ejs",'utf-8'),{index:result}));
  });
};
//渲染介绍页
exports.intro = function intro(req,res){
  db.query('select * from videoList where id=' + db.escape(req.query.id) + ';',(err,result)=>{
    if(err){throw err;}
    let video = {};
    //写入视频信息
    video.id = result[0].id;
    video.name = result[0].name;
    video.poster = '/static/poster/' + result[0].poster;
    video.intro = result[0].intro;
    //console.log(result[0])
    res.set('Content-Type','text/html');
    res.send(ejs.render(fs.readFileSync("./views/intro.ejs",'utf-8'),{video:video}));
    //console.log(video)
  });
};
exports.player = function (req,res){
  db.query('select * from videoList where id=' + db.escape(req.query.id) + ';',(err,result)=>{
    if(err){throw err;}
    let video = {};
    //生成视频地址
    video.src = '/video/' + result[0].filename;
    video.name = result[0].name;
    res.set('Content-Type','text/html');
    res.send(ejs.render(fs.readFileSync("./views/player.ejs",'utf-8'),{video:video}));
    //console.log(video)
  });
}
