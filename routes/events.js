//**************************************************************************
// User routes / Events

// host + /api/events
//**************************************************************************

const { Router } = require('express');
const router = Router();

const { validateJWT } = require('../middlewares/validate-jwt');
const {
    getEvents,
    updateEvent,
    createEvent,
    deleteEvent
} = require('../controllers/events');

//**************************************************************************

router.use( validateJWT );

//**************************************************************************

router.get( '/', getEvents );
router.post( '/', createEvent );
router.put( '/:id', updateEvent );
router.delete( '/:id', deleteEvent );

//**************************************************************************

module.exports = router;