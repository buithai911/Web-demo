const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
    // Lay quyen truy cap tu req header
    const Authorization = req.header('authorization')
    if (!Authorization){
        const err = new Error('Unauthorized')
        err.statusCode = 400
        return next(err)
    }
    // get token
    const token = Authorization.replace("Bearer ", "")
    // Verify token
    const {userId} = jwt.verify(token, process.env.APP_SECRET)
    req.body['userId'] = userId
    next()
}