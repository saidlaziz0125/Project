const mongoose = require("mongoose")
const schema = mongoose.Schema

const db = new schema({
    kelganSut: {
        type: Number,
    },

    jir: {
        type: Number,
    },

    kimOlibKeldi: {
        type: String,
    },

    perePul: {
        type: "Number",
    },

    naqdPul: {
        type: Number,
    },

    sutNarxi: {
        type: Number,
    },

    ferma: {
        type: String,
    },

    date: {
        type: Date,
    },

    userId: schema.Types.ObjectId

})


module.exports = mongoose.model("mutedData", db)