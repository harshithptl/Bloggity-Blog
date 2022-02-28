const EventEmitter = require('events');

// Logger class to implement upon every query execution
class logger extends EventEmitter{
    log(){
        this.emit('Executed');
    }
}

module.exports = logger;