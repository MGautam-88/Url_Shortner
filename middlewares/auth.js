const {getUser} = require("../service/auth");

async function isLoggedin(req,res,next){
    const userUid = req.cookies?.uid;//cookie ko name ke saath nika liya 

    if(!userUid) return res.redirect("/login");
    const user = getUser(userUid);

    if(!user) return res.redirect("/login");

    req.user = user;//req obj mein apne wala auth user daal denge
    next();//imp 
};

async function checkAuth(req,res,next){
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);
    req.user = user;
    next();
}

module.exports = {
    isLoggedin,
    checkAuth,
}