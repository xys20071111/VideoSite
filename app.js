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
app.use('/player',(req,res)=>{
  let video = {};
    db.query('select * from videoList where id=?',[req.query.id],(err,result)=>{
      if(err){throw err;}
      video.src = '/video/' + result[0].id + '.mp4';
      video.name = result[0].name;
    });
  res.set('Content-Type','text/html');
  res.send(ejs.render(fs.readFileSync("./views/player.ejs",'utf-8'),{video:video}));
});
app.use('/index',index);
app.use('/',index);
function index(req,res){
  
}
app.listen(80);
