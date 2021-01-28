//**************************************************************************

// Generates a JWT from a uid and a name

//**************************************************************************

const jwt = require('jsonwebtoken');

//**************************************************************************

const generateJWT = ( uid, name ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid, name };

        jwt.sign( payload, process.env.JWT_SECRET_SEED, {
            expiresIn: '2h',
        }, (err, token) => {

            if ( err ){
                reject('The token could not have been generated');
            }

            resolve( token );
        });

    });

}

//**************************************************************************

module.exports = {
    generateJWT
} 