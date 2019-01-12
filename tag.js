const database = require('./database');
// exports.searchByTag = function (req,res){
//   database.query('select * from videoList WHERE name REGEXP \'' + database.escape(req.query.tagid) + '\';',(err,result)=>{
//
//   });
// }
exports.addTag = function (req,res){
  database.query();
}
