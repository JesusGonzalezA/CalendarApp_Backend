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

// Create server
const app = express();

// Connect DB
dbConnection();

// CORS
app.use( cors() );

// Public directory
app.use( express.static('public') );

// Read body correctly
app.use( express.json() );

// Routes
app.use( '/api/auth', require('./routes/auth.js') );

//Listen requests
app.listen( process.env.PORT, () => {
    console.log('Server running on port', process.env.PORT);
} );

//--------------------------------------------------------------------------

 