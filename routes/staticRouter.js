const express = require("express");
const router = express.Router();
const Url = require("../models/url");

router.get('/',async (req,res)=>{
    const allurls = await Url.find({});
    const id = req.query.id || null;
    return res.render("home",{urls:allurls,id});
});

module.exports = router;