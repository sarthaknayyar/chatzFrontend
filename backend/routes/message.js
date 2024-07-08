const express = require('express');
const Message = require('../models/message');
const { checkLogin } = require('../middleware/auth');
const router = express.Router();
const User = require('../models/user');

router.post("/chat/:receiver/:sender",  async (req, res)=>{

    const receiver = req.params.receiver;
    const sender = req.params.sender;
    const content = req.body.content;

    const receiverobj = await User.findOne({username: receiver});
    const senderobj = await User.findOne({username: sender});
    // console.log(req.user.user.username);
    console.log(senderobj);

    const message = await Message.create({
        sender: senderobj._id,
        receiver: receiverobj._id,
        content,
    })

    message.save().then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(500).json(err);
    })
})

router.get("/chat/:receiver/:sender", async (req, res)=>{
    const receiver = req.params.receiver;
    const sender = req.params.sender;

    const receiverobj = await User.findOne({username: receiver});
    const senderobj = await User.findOne({username: sender});

    const messages1 = await Message.find({receiver: receiverobj._id, sender: senderobj._id}).populate('sender').populate('receiver');
    const messages2 = await Message.find({receiver: senderobj._id, sender: receiverobj._id}).populate('sender').populate('receiver');
    const messages = messages1.concat(messages2);

    res.status(200).json(messages);
});

module.exports = router;