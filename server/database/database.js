const mongoose = require('mongoose');
const User = require('../models/UserSchema');

module.exports = () => {
    mongoose.connect('mongodb://localhost:27017/event-room-test', {
        useNewUrlParser: true
    });       
    const db = mongoose.connection;
    db.once('open', err => {
        if (err) {
            console.log(err);
        }
        User.seedAdminUser()
            .then(() => console.log('Database ready!'))
            .catch(err => console.warn(err.message));
    });

    db.on('error', reason => {
        console.log(reason);
    });
};