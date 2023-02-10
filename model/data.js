const mongoose = require("mongoose")
const schema = mongoose.Schema

const db = new schema({
    kelganSut: {
        type: Number,
        default: 0
    },

    jir: {
        type: Number,
        default: 0
    },

    kimOlibKeldi: {
        type: String,
        default: 0
    },

    perePul: {
        type: "Number",
        default: 0
    },

    naqdPul: {
        type: Number,
        default: 0
    },

    sutNarxi: {
        type: Number,
        default: 0
    },

    ferma: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    },

    userId: schema.Types.ObjectId

})


module.exports = mongoose.model("Data", db)