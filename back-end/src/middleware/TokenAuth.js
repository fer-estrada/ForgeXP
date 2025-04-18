const jwt = require('jsonwebtoken')

const tokenAuth = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if(!authHeader) {
        return res.status(401).json({
            error: "Missing Authorization"
        })
    }
    const token = authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({
            error: "token format incorrect"
        })
    }

    jwt.verify(token, process.env.JWT, (err, decoded) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        console.log("our decoded token => ", decoded)
        req.userId = decoded.id
        req.isAdmin = decoded.isAdmin
        next()
    })
}

module.exports = tokenAuth