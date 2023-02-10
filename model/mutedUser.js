const mongoose = require("mongoose")
const schema  = mongoose.Schema

const db = new schema({
    username: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    login: {
        type: String,
        unique: true,
        required: true
    },

    region: {
        type: String,
        default: 0
    },
    
    password: {
        type: String,
        unique: true,
        required: true
    }
})

module.exports  = mongoose.model("mutedUser", db)