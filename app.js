"use strict"
const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const config = require('./config');
const render = require('./render');
const app = express();
//静态资源
app.use('/video',express.static('video'));
app.use('/static',express.static('static'));
//播放页
app.use('/player',render.player);
//介绍页
app.use('/intro',render.intro);
//首页
app.use('/',render.index);
//监听端口
app.listen(config.port);
//输出端口号
if(config.port == 80)
  console.log("Server is running on http://127.0.0.1");
else {
  console.log("Server is running on http://127.0.0.1:%d",config.port);
}
