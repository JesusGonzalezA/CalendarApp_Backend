//**************************************************************************

// Events controllers

//**************************************************************************

const { response } = require('express');

const { BadRequest } = require('../responses/BadRequest');
const { Success } = require('../responses/Success');
const Event = require('../models/Event');

//--------------------------------------------------------------------------

const getEvents = async( req, res = response ) => {
    res.status(200).json( Success('Get events') );
}

const createEvent = async( req, res = response ) => {
    res.status(200).json( Success('Add event') );
}

const updateEvent = async( req, res = response ) => {
    res.status(200).json( Success('Update event') );
}

const deleteEvent = async( req, res = response ) => {
    res.status(200).json( Success('Delete event') );
}
//--------------------------------------------------------------------------

//**************************************************************************

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}