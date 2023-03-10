const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Chat = new Schema({
    msg: String,
    dateEnvoi: Date
})

module.exports = mongoose.model('chat', Chat)