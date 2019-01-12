const database = require('./database');
exports.searchByTag = function (tag){
  let res;
  database.query('select * from videoList WHERE name REGEXP \'' + database.escape(tag) + '\';',(err,result)=>{
    res=result;
  });
  return res;
}
// exports.addTag = function (req,res){
//   let orginalTagList = null;
//   database.query('select * from videolist where id=?',req.query.id,(err,result)=>{
//     orginalTagList = result[0].tag;
//   });
//   if(orginalTagList.search(req.query.tagid) != -1){
//       database.query('update videolist set tag= \' ' + orginalTagList + ' ' + req.query.id'\';');
//       res.set('Content-Type','application/json');
//       res.sent('{"state":0}');
//   }else{
//     res.set('Content-Type','application/json');
//     res.sent('{"state":1}');
//   }
// }
