const express = require('express');
const Message = require('../models/message');
const { checkLogin } = require('../middleware/auth');
const router = express.Router();
const User = require('../models/user');

router.post('/sendChat', async (req, res) => {
    try {
      const { receiver, sender, content } = req.body;
  
      const receiverobj = await User.findOne({ username: receiver });
      const senderobj = await User.findOne({ username: sender });
  
      if (!receiverobj || !senderobj) {
        return res.status(404).json({ error: 'Sender or receiver not found' });
      }
  
      const message = await Message.create({
        sender: senderobj._id,
        receiver: receiverobj._id,
        content,
      });
  
      // Populate the sender and receiver fields
      const populatedMessage = await message.populate('sender receiver');
  
      console.log(populatedMessage);
      res.status(200).json(populatedMessage);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while sending the message' });
    }
  });

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