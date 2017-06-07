# mysql-layer
A simple Layer for mysql with promises


## Installation

`npm install mysql-layer --save-dev`

## Usage
Please see test.js on how to use
```javascript
db.tep_db_connect(host,user,password,database)
  .then(function(){
    db.tep_db_query('SELECT * FROM `tour` AS solution')
    .then(function(rows){
      console.log(rows);
    })
  })
  .then(function(){
    db.tep_db_close();  
})
```

## Copyright and License

Copyright 2017, PayPal under [the BSD2 license](LICENSE.md).
