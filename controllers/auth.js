//**************************************************************************

// Auth controllers

//**************************************************************************

const { response } = require('express');

//--------------------------------------------------------------------------

const addUser = ( req, res = response ) => {

    res.status(201).json({
        ok: true,
        msg: 'register',
        ...req.body
    })

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