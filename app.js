"use strict"
const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const mysql = require('mysql');
const config = require('./config');

const db = mysql.createConnection(config.db);
const app = express();
db.connect(function(err){if(err){throw err;}});
//静态资源
app.use('/video',express.static('video'));
app.use('/static',express.static('static'));
//播放页
app.use('/player',player);
//介绍页
app.use('/intro',intro);
//首页
app.use('/',index);
//监听端口号
app.listen(config.port);
//输出端口号
if(config.port == 80)
  console.log("Server is running on http://127.0.0.1");
else {
  console.log("Server is running on http://127.0.0.1:%d",config.port);
}
//渲染首页
function index(req,res){
  db.query('select * from videoList',(err,result)=>{
    if(err){throw err;}
    res.set('Content-Type','text/html');
    res.send(ejs.render(fs.readFileSync("./views/index.ejs",'utf-8'),{index:result}));
  });
}
//渲染播放页
function player(req,res){
  db.query('select * from videoList where id=' + db.escape(req.query.id) + ';',(err,result)=>{
    if(err){throw err;}
    let video = {};
    video.src = '/video/' + result[0].filename;
    video.name = result[0].name;
    res.set('Content-Type','text/html');
    res.send(ejs.render(fs.readFileSync("./views/player.ejs",'utf-8'),{video:video}));
    //console.log(video)
  });
}
//渲染介绍页
function intro(req,res){
  db.query('select * from videoList where id=' + db.escape(req.query.id) + ';',(err,result)=>{
    if(err){throw err;}
    let video = {};
    video.id = result[0].id;
    video.name = result[0].name;
    video.poster = '/static/poster/' + result[0].poster;
    video.intro = result[0].intro;
    //console.log(result[0])
    res.set('Content-Type','text/html');
    res.send(ejs.render(fs.readFileSync("./views/intro.ejs",'utf-8'),{video:video}));
    //console.log(video)
  });
}
