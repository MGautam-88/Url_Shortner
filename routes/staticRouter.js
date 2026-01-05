const express = require("express");
const Url = require("../models/url");
const router = express.Router();



router.get('/',async (req,res)=>{
    if(!req.user) return res.redirect("/login");
    const allurls = await Url.find({createdBy:req.user._id});//sirf wahi url jo iss user ne banaye hai 
    const id = req.query.id || null;
    return res.render("home",{urls:allurls,id});
});

router.get('/signup', (req,res)=>{
    return res.render("signup");
});

router.get('/login', (req,res)=>{
    return res.render("login");
});

module.exports = router;