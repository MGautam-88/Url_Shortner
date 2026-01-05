const jwt = require("jsonwebtoken");
const secret = "Abc12$12";

function setUser(user){
    // Only include safe fields in the payload
    return jwt.sign({
        _id: user._id,
        email: user.email,
        name: user.name
    }, secret);
}

function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token,secret);
    } catch (err) {
        console.error("JWT verification error:", err.message);
        return null;
    }
}

module.exports={
    setUser,
    getUser,
}