const mongoose = require("mongoose")
const Schema = mongoose.Schema

const user2Schema = new Schema({
    userName: String,
    facebookId: String
}, { collection: "facebookuser" })

const User1 = mongoose.model("user2", user2Schema)

module.exports = User1