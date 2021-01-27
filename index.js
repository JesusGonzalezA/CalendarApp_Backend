const express = require('express');

// Create server
const app = express();

// Routes
app.get('/', (req, res) => {
    res.json({
        hey: 'Hola mundo'
    })
})

//Listen requests
app.listen( 3030, () => {
    console.log('Server running on port', 3030);
} );
 
 