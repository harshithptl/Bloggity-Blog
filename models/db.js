const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_password",
    database: "database"
  });
  
function execute_query(query){
    return new Promise((resolve, reject) => {
        con.query(query, function(err, result, fields) {
            if (err) {
                // Returning the error
                reject(err);
            }
            resolve(result);
        });
    });
    
}




module.exports={
    execute_query
}