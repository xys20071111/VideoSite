const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const mysql = require('mysql');
const app = express();
app.use('/video',express.static('video'));
app.use('/static',express.static('static'));
app.use('/player',(req,res)=>{
  res.set('Content-Type','text/html');
  res.send(ejs.render(fs.readFileSync("./views/player.ejs",'utf-8'),{video:video}));
});
app.listen(80);
