const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.post('/signup', async (req, res)=>{
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const user = await User.create
       ({ username: req.body.username,
        email: req.body.email,
        password: hashPassword});
        // console.log(user);

        user.save().then((data)=>{
            res.json(data);
        }).catch((error)=>{
            res.json(error);
        });
})

module.exports = router;