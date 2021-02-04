//**************************************************************************

// Auth controllers

//**************************************************************************

const { response } = require('express');
const bcrypt = require('bcryptjs');

const { BadRequest } = require('../responses/BadRequest');
const { Success } = require('../responses/Success');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt')

//--------------------------------------------------------------------------

const addUser = async( req, res = response ) => {

    const { email } = req.body;

    try {
        
        let user = await User.findOne({ email });
        
        if ( user ) {
            return res.status(400).json( BadRequest('Email is already in use') );
        }
        
        user = User( req.body );

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( user.password, salt );

        await user.save();
        
        // Generate JWT
        const token = await generateJWT( user.id, user.name );

        res.status(201).json( Success({
            uid: user.id,
            name: user.name,
            token
        }));

    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Sorry, something went bad',
        })

    }
    
}

//--------------------------------------------------------------------------

const loginUser = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });
        
        if ( !user ) {
            return res.status(400).json( BadRequest( 'User does not exist' ) );
        }

        // Encrypt password
        const validPassword = bcrypt.compareSync( password, user.password );

        if ( !validPassword ){
            return res.status(400).json( BadRequest( 'Incorrect password' ) );
        }

        // Generate JWT
        const token = await generateJWT( user.id, user.name );

        res.status(201).json( Success({
            uid: user.id,
            name: user.name,
            token
        }));

    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Sorry, something went bad',
        })

    }

}

//--------------------------------------------------------------------------

const revalidateTokenUser = async ( req, res = response ) => {

    const { uid, name } = req;

    const token = await generateJWT( uid, name);

    res.json(Success({
        token,
        uid,
        name
    }))

}

//--------------------------------------------------------------------------

//**************************************************************************

module.exports = {
    addUser,
    revalidateTokenUser,
    loginUser
}
