//**************************************************************************

// Auth controllers

//**************************************************************************

const { response } = require('express');
const bcrypt = require('bcryptjs');

const { BadRequest } = require('../responses/BadRequest');
const { Success } = require('../responses/Success')
const User = require('../models/User')

//--------------------------------------------------------------------------

const addUser = async( req, res = response ) => {

    const { email, password } = req.body;

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

        res.status(201).json( Success({
            uid: user.id,
            name: user.name
        }));

    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Sorry, something went bad',
        })

    }
    
}

//--------------------------------------------------------------------------

const loginUser = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'login'
    })

}

//--------------------------------------------------------------------------

const revalidateTokenUser = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'revalidate token'
    })

}

//--------------------------------------------------------------------------

//**************************************************************************

module.exports = {
    addUser,
    revalidateTokenUser,
    loginUser
}