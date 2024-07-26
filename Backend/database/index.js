const mysql = require('mysql2');
const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smartscreen'
  };

const connection = mysql.createConnection(config)
connection.connect((err)=>{
    if (err) {
        console.log(err)
    }
    else {
        console.log("You're safe !!!!!!!!!!!!  ")
    }
})


module.exports= connection;