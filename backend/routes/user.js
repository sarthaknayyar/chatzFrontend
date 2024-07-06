const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { setUser } = require('../authservice');

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

router.post('/login', async (req, res)=>{
    const email = req.body.email;
    const user = await User.findOne({email});
    if(!user){
        return res.json({message: "User not found"});
    }
    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if(!validPassword){
        return res.json({message: "Invalid Password"});
    }
    const token =  setUser(user);
    res.cookie("token", token);
    return res.status(200).json({token});
})

module.exports = router;