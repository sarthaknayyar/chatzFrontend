const jwt = require('jsonwebtoken');
const secretkey = "sarthak";

function setUser(user){
    const token = jwt.sign({user},secretkey, {expiresIn: '2h'});
    return token;
}

function getUser(token){
    const user = jwt.verify(token, secretkey);
    return user;
}

module.exports = {setUser,getUser};