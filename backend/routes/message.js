const express = require('express');
const Message = require('../models/message');
const { checkLogin } = require('../middleware/auth');
const router = express.Router();
const User = require('../models/user');

router.post("/:receiver", checkLogin, async (req, res)=>{

    const receiver = req.params.receiver;
    const sender = req.user.user.username;
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

module.exports = router;