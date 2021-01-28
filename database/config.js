//**************************************************************************

// Connection to database

//**************************************************************************

const connectToDB = require("./mongoose-connection");

//**************************************************************************

const dbConnection = async () => {

    try {

        await connectToDB();
        console.log('DB is connected');

    } catch ( error ) {

        throw new Error('Error at DB initialization');
    
    }
}

//**************************************************************************

module.exports = {
    dbConnection
}