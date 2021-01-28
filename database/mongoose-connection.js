//**************************************************************************

// Connect to mongoose

/*
    You need to congifure the .env file
    Include:
    
    -   DB_USER=<your username>
    -   DB_PASS=<your password>
    -   DB_CLUSTER=<your cluster>
    -   DB_CNN=mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}.xcdc4.mongodb.net/mern_calendar
*/

//**************************************************************************

const mongoose = require('mongoose');

//**************************************************************************

const mongooseConnect = async () => {

    await mongoose.connect(  process.env.DB_CNN, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    })

};

//**************************************************************************

module.exports = mongooseConnect;
