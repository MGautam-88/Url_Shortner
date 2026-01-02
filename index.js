const express = require("express");
const path = require("path");

const { connectToMongoDB } = require("./connection");
const staticRoute = require("./routes/staticRouter");
const urlRoute = require("./routes/url");
const Url = require("./models/url");
const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
    .then(() => { console.log("MongoDB Connected"); });
  
app.set("view engine","ejs");
app.set("views",path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/url", urlRoute);
app.use("/",staticRoute);
// [ADDED] Tell Express to serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate(
        { shortId },
        {$push:{visitHistory:{timestamp:Date.now(),},}},
    );
    res.redirect(entry.redirectURL)
});

app.listen(PORT, () => { console.log(`Server Started at Port:${PORT}`) });