//**************************************************************************
// User routes / Auth

// host + /api/auth
//**************************************************************************

const { Router } = require('express');
const { check }  = require('express-validator');
const router = Router();

const { validateFields } = require('../middlewares/fields-validator');
const { 
    addUser,
    revalidateTokenUser,
    loginUser
} = require('../controllers/auth');

//**************************************************************************

router.get( '/renew', revalidateTokenUser );

router.post(
    '/',
    [   
        check('email', 'Email is required').not().isEmpty(),
        check('email', 'Email is invalid').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        check('password', 'Password should be at least 6 characters long').isLength({min: 6}),
        validateFields
    ], 
    loginUser 
);

router.post( 
    '/new',
    [   
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').not().isEmpty(),
        check('email', 'Email is invalid').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        check('password', 'Password should be at least 6 characters long').isLength({min: 6}),
        validateFields
    ],
    addUser 
);

//**************************************************************************

module.exports = router;