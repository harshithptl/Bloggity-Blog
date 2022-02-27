const mysql = require('mysql');
const fs = require('fs');
const Logger = require('../logger.js');
const logger = new Logger();

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "harshith7",
    database: "blogs"
  });
  
function execute_query(query){
    return new Promise((resolve, reject) => {
        con.query(query, function(err, result, fields) {
            if (err) {
                // Returning the error
                reject(err);
            }
            
            //Writing to a log file using a user defined log function that extended EventEmitter class
            const writer = fs.createWriteStream('log.txt',{flags:'a'});
            logger.once('Executed', ()=>{
                writer.write(`Query executed ${query} \n`);
            });
            logger.log();
            resolve(result);
        });
    });
    
}

module.exports={
    execute_query
}