// Import lib
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Check Token
        let token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        
        // Set request authorization
        req.auth = decoded
        return next()
    } catch (error) {
        return res.status(401).send({
            status: 401,
            message: "ไม่มีสิทธิ"
        })
    }
}
