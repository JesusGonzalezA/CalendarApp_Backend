//**************************************************************************

// Config server

//**************************************************************************

const express = require('express');
require ('dotenv').config();

//--------------------------------------------------------------------------

// Create server
const app = express();

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

 