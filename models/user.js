const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String, 
        required: true,
        unique: true
    }
});
userSchema.plugin(passportLocalMongoose); // add on fields for passport, to make sure usernames are unique.


module.exports = mongoose.model('User', userSchema);