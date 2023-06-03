const jwt = require('jsonwebtoken')

exports.checkCurrentUser = (req, res, next) => {
    // Lay quyen truy cap tu req header
    const Authorization = req.header("authorization")
    if (!Authorization){
        req.body['userId'] = null
        next()
    } else {
        // get token
        const token = Authorization.replace("Bearer ", "")
        // Verify token
        try {
            const { userId } = jwt.verify(token, process.env.APP_SECRET)
            req.body['userId'] = userId
            next()
        } catch (error) {
            req.body['userId'] = null
            next()
    }
    }
}