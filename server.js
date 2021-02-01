//**************************************************************************

// Config server

//**************************************************************************

const express = require('express');
const cors = require('cors');
const env  = require ('dotenv');
const env_expand = require('dotenv-expand');

const { dbConnection } = require('./database/config.js');

env_expand( env.config() );

//--------------------------------------------------------------------------

class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        this.setDatabase();
        this.setMiddleware();
        this.setRoutes();
    }
    
    setDatabase() {
        dbConnection();
    }

    setMiddleware() {
        this.app.use( cors() );
        this.app.use( express.static('public') );
        this.app.use( express.json() );
    }
    
    setRoutes() {
        this.app.use( '/api/auth', require('./routes/auth.js') );
        this.app.use( '/api/events', require('./routes/events.js'));
    }

    start() {
        this.app.listen( this.port, () => {
            console.log('Server running on port', this.port);
        } );
    }
}

//--------------------------------------------------------------------------

 const server = new Server();

 module.exports = server;