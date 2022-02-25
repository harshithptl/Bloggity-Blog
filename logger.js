const EventEmitter = require('events');

class logger extends EventEmitter{
    log(){
        this.emit('Executed');
    }
}

module.exports = logger;