const express = require("express");
const {handleGenerateNewShortURL , handleGetAnalytics} = require("../controllers/url");
const router = express.Router();

const { isLoggedin } = require("../middlewares/auth");
// router.post("/", isLoggedin, handleGenerateNewShortURL);


router.post("/",isLoggedin,handleGenerateNewShortURL);

router.get("/analytics/:shortId",handleGetAnalytics);

module.exports = router;

