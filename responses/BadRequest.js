//**************************************************************************

// Form a bad request 

// ok: false
// msg: string

//**************************************************************************

const BadRequest = ( msg = 'Sorry, something went bad' ) => {
    
    return {
        ok: false,
        msg
    }

}

//**************************************************************************

module.exports = { BadRequest };