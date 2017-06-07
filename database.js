  var mysql      = require('mysql');

  var connection ='';

  module.exports = {
    results:'',
    tep_db_connect: function (server, username, password, database) {
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
          resolve(connection.threadId);
        });
      }) 
    },
    tep_db_query: function (query) {
      return new Promise(function(resolve, reject) {
        connection.query(query, function (err, results, fields) {
          if (err) reject(err);
          resolve(results);
        })
      });  
    },
    tep_db_insert: function (tablename, jsObj) {
      return new Promise(function(resolve, reject) {
        var query = connection.query('INSERT INTO '+ tablename +' SET ?', jsObj, function(err, result) {
          if (err) reject(err);
          resolve(result.insertId);
        });
        // console.log(query.sql);
      })
    },
    tep_db_update: function (tablename, colsObj , whereObj) {
      return new Promise(function(resolve, reject) {
        var sql =  'UPDATE ' + tablename +' SET ';
        for (let column in colsObj) {
           sql +=  column + ' = \'' + escape(colsObj[column]) + '\', ';
        }
        sql= sql.substring(0, (sql.length-2));
        sql += ' WHERE 1 '
        for (let column in whereObj) {
           sql +=  'AND '+ column + ' = \'' + escape(whereObj[column]) + '\'';
        }
        // console.log(sql);
        var query = connection.query(sql);
        connection.query(sql, function (err, results, fields) {
          if (err) reject(err);
          // console.log(results, fields);
          resolve(results.changedRows);
        })
      })
    },
    tep_db_delete: function (tablename, whereObj) {
      return new Promise(function(resolve, reject) {
        var sql =  'DELETE FROM ' + tablename + ' WHERE 1 ';
        for (let column in whereObj) {
           sql +=  'AND '+ column + ' = \'' + escape(whereObj[column]) + '\'';
        }
        // console.log(sql);
        var query = connection.query(sql);
        connection.query(sql, function (err, results, fields) {
          if (err) reject(err);
          // console.log(results, fields);
          resolve(results.affectedRows);
        })
      })
    },
    tep_db_close(){
      connection.end();      
    }
  };

