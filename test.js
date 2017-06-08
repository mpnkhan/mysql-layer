var db = require('./database');

const  host = 'localhost';
const user ='root';
const password ='';
const database = 'showcase';

db.db_connect(host,user,password,database)
  .then(function(){
    db.db_query('SELECT * FROM `tour` AS solution')
    .then(function(rows){
      // console.log(rows);
    })
  })
  .then(function(){
    var cols = ['location', 'maxperson'];
    var whereObj = {'tourid':62 , 'maxperson' : 3}
    db.db_select("tour" , cols, whereObj)
    // db.db_select("tour" , '*')   //For selecting all columns in the table
    .then(function(rows){
      console.log(rows);
    })
  })
  
  .then(function(){
  	db.db_insert('tour', {'location': 'Singapore', 'maxperson':'11'})
  	.then(function(insID){
      insertID= insID
		  console.log('Insert id', insID);
  	})
  })
  .then( function(){
    var cols = {'location': 'Chennai', 'maxperson':'3'};
    var whereObj = {'tourid':62 , 'maxperson' : 11}
    db.db_update("tour" , cols, whereObj)
      .then(function(changedRows){
        console.log('Changed Rows', changedRows);
      })
  })
  .then( function(){
    var whereObj = {'tourid':65 , 'maxperson' : 11}
    db.db_delete("tour")
      .then(function(affectedRows){
        console.log('Affected Rows', affectedRows);
      })
      .catch(function (err) {
        console.log("Promise Rejected: " + err);
      });
  })

  .then(function(){
    db.db_close();  
})