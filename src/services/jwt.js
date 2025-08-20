const jwt = require('jsonwebtoken');
// TODO use identity name from exam description

function createToken(userData) {
    const payload = {
        _id: userData._id,
        email: userData.email
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
}

function verifyToken(token) {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return data;
}
module.exports = {
    createToken,
    verifyToken
}