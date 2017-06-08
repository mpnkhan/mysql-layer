# mysql-layer
A simple Layer for mysql with promises


## Installation

`npm install mysql-layer --save-dev`

## Usage
Please see test.js on how to use
```javascript
db.db_connect(host,user,password,database)
  .then(function(){
    var cols = ['location', 'maxperson'];
    var whereObj = {'tourid':28 , 'maxperson' : 3}        
    db.db_select("tour" , cols, whereObj)
    .then(function(rows){
      console.log(rows);
    })
  })
  .then(function(){
    db.db_close();  
})
```

## Copyright and License

Copyright 2017, Nawaz under [the BSD2 license](LICENSE.md).
