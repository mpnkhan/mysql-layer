  var mysql      = require('mysql');

  var connection ='';

  module.exports = {
    results:'',
    db_connect: function (server, username, password, database) {
      return new Promise(function(resolve, reject) {
        connection = mysql.createConnection({
          host     : server,
          user     : username,
          password :  password,
          database : database
        });
        connection.connect(function(err) {
          if (err) {
            reject(err);
          }
          else resolve(connection.threadId);
        });
      }) 
    },
    db_query: function (query) {
      return new Promise(function(resolve, reject) {
        connection.query(query, function (err, results, fields) {
          if (err) reject(err);
          else resolve(results);
        })
      });  
    },
    db_select: function (tablename, colsObj , whereObj) {
      return new Promise(function(resolve, reject) {
        var sql =  'SELECT ';
        for (var column in colsObj) {
         sql +=  colsObj[column] + ', ';
        }
        sql= sql.substring(0, (sql.length-2));
        sql +=  ' FROM '+ tablename ;
        sql += ' WHERE 1 '
        for (var column in whereObj) {
           sql +=  'AND '+ column + ' = \'' + escape(whereObj[column]) + '\'';
        }
        // console.log(sql);
        connection.query(sql, function (err, results, fields) {
          if (err) reject(err);
          else resolve(results);
        })
      })
    },    
    db_insert: function (tablename, jsObj) {
      return new Promise(function(resolve, reject) {
        var query = connection.query('INSERT INTO '+ tablename +' SET ?', jsObj, function(err, result) {
          if (err) reject(err);
          else resolve(result.insertId);
        });
        // console.log(query.sql);
      })
    },
    db_update: function (tablename, colsObj , whereObj) {
      return new Promise(function(resolve, reject) {
        var sql =  'UPDATE ' + tablename +' SET ';
        for (var column in colsObj) {
           sql +=  column + ' = \'' + escape(colsObj[column]) + '\', ';
        }
        sql= sql.substring(0, (sql.length-2));
        sql += ' WHERE 1 '
        for (var column in whereObj) {
           sql +=  'AND '+ column + ' = \'' + escape(whereObj[column]) + '\'';
        }
        // console.log(sql);
        connection.query(sql, function (err, results, fields) {
          if (err) reject(err);
          // console.log(results, fields);
          else resolve(results.changedRows);
        })
      })
    },
    db_delete: function (tablename, whereObj) {
      return new Promise(function(resolve, reject) {
        if(whereObj == null){
          var err ='Missing `WHERE` clause in `DELETE` query';
          return reject(err);
        }
        var sql =  'DELETE FROM ' + tablename + ' WHERE 1 ';
        for (var column in whereObj) {
           sql +=  'AND '+ column + ' = \'' + escape(whereObj[column]) + '\'';
        }
        // console.log(sql);
        var query = connection.query(sql);
        connection.query(sql, function (err, results, fields) {
          if (err) reject(err);
          // console.log(results, fields);
          else resolve(results.affectedRows);
        })
      })
    },
    db_close: function(){
      connection.end();      
    }
  };

