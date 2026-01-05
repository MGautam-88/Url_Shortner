const User = require("../models/user");
// const Url = require("../models/url");
const {v4:uuidv4} = require("uuid");
const {setUser,getUser} = require("../service/auth");

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    try {
        await User.create({
            name,
            email,
            password,
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).send("Email already registered");
        }
        throw err;
    }

    // return res.redirect("/");
    // return res.render("home",{id:null});
    return res.redirect("/login");
}

async function handleUserLogin(req, res) {
    const {email, password } = req.body;

    const user = await User.findOne({email,password});//find a user with given email and pwd
    if(!user) return res.render("login", {error:"Invalid Credentials!"});

    const token = setUser(user);

    res.cookie("uid", token);

    return res.redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
};