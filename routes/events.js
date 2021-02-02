//**************************************************************************
// User routes / Events

// host + /api/events
//**************************************************************************

const { check } = require('express-validator');
const { Router } = require('express');
const router = Router();

const { isDate } = require('../helpers/isDate');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/fields-validator');
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

router.post( 
    '/', 
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start date is required').custom( isDate ),
        check('end', 'End date is required').custom( isDate ),
        validateFields
    ],
    createEvent 
);

router.put( 
    '/:id', 
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start date is required').custom( isDate ),
        check('end', 'End date is required').custom( isDate ),
        validateFields
    ],
    updateEvent 
);

router.delete( '/:id', deleteEvent );

//**************************************************************************

module.exports = router;