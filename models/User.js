const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "You cannot create an article without title"]
    },
    password:{
        type: String,
        required: [true, "You cannot create an article without content"]
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;