const express = require('express');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('video'));
app.use(express.static('static'));
app.use('/player',(req,res)=>{
  let video = {src:req.query.id + ".mp4",name:"TEST"};
  res.set('Content-Type','text/html');
  res.send(ejs.render(fs.readFileSync("./views/player.ejs",'utf-8')));
});
app.listen(80);
