var db = require('./database.js');

const  host = 'localhost';
const user ='root';
const password ='';
const database = 'showcase';

db.tep_db_connect(host,user,password,database)
  .then(function(){
    db.tep_db_query('SELECT * FROM `tour` AS solution')
    .then(function(rows){
      // console.log(rows);
    })
  })
  .then(function(){
  	db.tep_db_insert('tour', {'location': 'Singapore', 'maxperson':'11'})
  	.then(function(insID){
      insertID= insID
		  console.log('Insert id', insID);
  	})
  })
  .then( function(){
    var cols = {'location': 'Chennai', 'maxperson':'3'};
    var whereObj = {'tourid':30 , 'maxperson' : 11}
    db.tep_db_update("tour" , cols, whereObj)
      .then(function(changedRows){
        console.log('Changed Rows', changedRows);
      })
  })
  .then( function(){
    var whereObj = {'tourid':38 , 'maxperson' : 11}
    db.tep_db_delete("tour" , whereObj)
      .then(function(affectedRows){
        console.log('Affected Rows', affectedRows);
      })
  })

  .then(function(){
    db.tep_db_close();  
})