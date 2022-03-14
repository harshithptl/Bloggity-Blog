const mongoose = require('mongoose');
const fs = require('fs');
const Logger = require('../logger.js');

const Schema = mongoose.Schema;

function log(message){
    const logger = new Logger();
    //Writing to a log file using a user defined log function that extended EventEmitter class
    const writer = fs.createWriteStream('log.txt',{flags:'a'});
    logger.once('Executed', ()=>{
        writer.write(`${message} \n`);
    });
    logger.log();
}

//Blog Schema
const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true });

//User Schema
const userSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    linkedin: {
      type: String,
      required: false
    },
    github: {
        type: String,
        required: false
      }
  }, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
const Users  = mongoose.model('Users', userSchema);
module.exports = {Blog,Users,log};