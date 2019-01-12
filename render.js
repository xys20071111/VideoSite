const ejs = require('ejs');
const fs = require('fs');
const database = require('./database');
const tag = require('./tag');
//渲染首页
exports.index = function (req,res){
  database.query('select * from videoList',(err,result)=>{
    if(err){throw err;}
    res.set('Content-Type','text/html');
    res.send(ejs.render(fs.readFileSync("./views/index.ejs",'utf-8'),{index:result}));
  });
};
//渲染介绍页
exports.intro = function intro(req,res){
  database.query('select * from videoList where id=' + database.escape(req.query.id) + ';',(err,result)=>{
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
  database.query('select * from videoList where id=\'' + database.escape(req.query.id) + '\';',(err,result)=>{
    if(err){throw err;}
    let video = {};
    //生成视频地址
    video.src = '/video/' + result[0].filename;
    video.name = result[0].name;
    res.set('Content-Type','text/html');
    res.send(ejs.render(fs.readFileSync("./views/player.ejs",'utf-8'),{video:video}));
    //console.log(video)
  });
};
exports.search = function (req,res){
  if(req.query.word){
    database.query('select * from videoList WHERE name REGEXP \'' + req.query.word + '\';',(err,result)=>{
      if(err){throw err;}
      res.set('Content-Type','text/html');
      res.send(ejs.render(fs.readFileSync("./views/searchresult.ejs",'utf-8'),{index:result,word:req.query.word}));
    });
  }else if(req.query.tag){
    database.query('select * from videoList WHERE tag REGEXP \'' + req.query.tag + '\';',(err,result)=>{
      if(err){throw err;}
      res.set('Content-Type','text/html');
      res.send(ejs.render(fs.readFileSync("./views/searchresult.ejs",'utf-8'),{index:result,word:req.query.word}));
    });
  }else{
    res.set('Content-Type','text/html');
    res.send(fs.readFileSync('./views/search.html'));
  }
}
