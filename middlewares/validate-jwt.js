//**************************************************************************

// Renew jwt as long as it is valid

//**************************************************************************

const { response } = require('express');
const jwt = require('jsonwebtoken');

const { BadRequest } = require('../responses/BadRequest');

//**************************************************************************

const validateJWT = ( req, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ){
        return res.status(401).json( BadRequest('Token is required'));
    }

    try {

        const { uid, name } = jwt.verify( token, process.env.JWT_SECRET_SEED );
        
        req.uid  = uid;
        req.name = name;
        
    } catch( error ){
        return res.status(401).json( BadRequest('Token is not valid'));
    }

    next();
}

//**************************************************************************

module.exports = {
    validateJWT
}