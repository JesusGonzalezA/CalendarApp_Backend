//**************************************************************************
// User routes / Auth

// host + /api/auth
//**************************************************************************

const { Router } = require('express');
const router = Router();

const { 
    addUser,
    revalidateTokenUser,
    loginUser
} = require('../controllers/auth')

//**************************************************************************

router.get( '/renew', revalidateTokenUser );

router.post('/', loginUser );
router.post( '/new', addUser );

//**************************************************************************

module.exports = router;