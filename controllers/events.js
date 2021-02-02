//**************************************************************************

// Events controllers

//**************************************************************************

const { response } = require('express');

const { BadRequest } = require('../responses/BadRequest');
const { Success } = require('../responses/Success');
const Event = require('../models/Event');

//--------------------------------------------------------------------------

const getEvents = async( req, res = response ) => {

    const events = await Event.find()
                              .populate('user', 'name');

    res.status(200).json( Success( events ) );
}

const createEvent = async( req, res = response ) => {
    
    const event = new Event( req.body );
    
    try {
        event.user = req.uid;
        const savedEvent = await event.save();

        res.status(200).json( Success( savedEvent ) );
    } catch (error) {
        res.status(500).json( BadRequest() );
    }
}

const updateEvent = async( req, res = response ) => {
    
    const eventId = req.params.id;
    const uid = req.uid;
    
    try {

        const event = await Event.findById( eventId );

        if ( !event ) {
            res.status(404).json( BadRequest('Not found') );
            return;
        }

        if ( event.user.toString() !== uid ) {
            res.status(401).json( BadRequest('You cannot edit this event') );
            return;
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, {new: true} );

        res.status(200).json( Success( updatedEvent ) );

    } catch (error) {
        res.status(500).json( BadRequest() );
    }
}

const deleteEvent = async( req, res = response ) => {
    
    const eventId = req.params.id;
    const uid = req.uid;
    
    try {

        const event = await Event.findById( eventId );

        if ( !event ) {
            res.status(404).json( BadRequest('Not found') );
            return;
        }

        if ( event.user.toString() !== uid ) {
            res.status(401).json( BadRequest('You cannot delete this event') );
            return;
        }
        
        await Event.findByIdAndDelete( eventId );

        res.status(200).json( Success( 'Event deleted' ) );
        
    } catch (error) {
        res.status(500).json( BadRequest() );
    }
}
//--------------------------------------------------------------------------

//**************************************************************************

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}