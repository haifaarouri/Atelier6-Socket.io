const Chat = require('../models/chat')

exports.getAllChats = (req, res, next) => {
    Chat.find()
        .then((chats) => res.json({ message: "List of All Chats", chatList: chats }))
        .catch(err => res.status(400).json('Error: ' + err))
}

exports.addChat = async (req, res, next) => {
    var s = new Chat({
        msg: req.body.msg,
        dateEnvoi: req.body.dateEnvoi
    })
    s.save()
        .then(data => res.send(data))
        .catch(err => res.status(500).json('Error: ' + err))
}

exports.getByID = (req, res, next) => {
    Chat.findById(req.params.id)
        .then(s => res.json(s))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.updateChat = (req, res, next) => {
    Chat.findByIdAndUpdate(req.params.id, req.body)
        .then(s => {
            s.msg = req.body.msg;
            s.dateEnvoi = req.body.dateEnvoi;
        })
        .then(() => res.json('Chat updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.deleteChat = (req, res, next) => {
    Chat.findByIdAndDelete(req.params.id)
        .then(() => res.json('Chat deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
}