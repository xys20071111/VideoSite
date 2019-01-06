"use strict"
const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const mysql = require('mysql');
const config = require('./config');

const db = mysql.createConnection(config.db);
const app = express();
db.connect(function(err){if(err){throw err;}});

app.use('/video',express.static('video'));
app.use('/static',express.static('static'));
//播放页
app.use('/player',player);
//首页
app.use('/',index);
app.listen(80);
function index(req,res){
  db.query('select * from videoList',(err,result)=>{
    if(err){throw err;}
    res.set('Content-Type','text/html');
    res.send(ejs.render(fs.readFileSync("./views/index.ejs",'utf-8'),{index:result}));
  });
}
function player(req,res){
  db.query('select * from videoList where id=' + db.escape(req.query.id) + ';',(err,result)=>{
    if(err){throw err;}
    let video = {};
    video.src = '/video/' + result[0].id + '.mp4';
    video.name = result[0].name;
    res.set('Content-Type','text/html');
    res.send(ejs.render(fs.readFileSync("./views/player.ejs",'utf-8'),{video:video}));
    console.log(video)
  });
}
