exports.errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    // Trung
    if (err.code === 11000){
        err.statusCode = 400
        for (let p in err.keyValue){
            err.message = `${p} have to be unique` 
        }
    }
    // Not found object id
    if (err.kind === "ObjectId"){
        err.statusCode = 404
        err.message = 'Wrong Id'
    }
    // user id not found
    if (err.error){
        err.statusCode = 400
        err.message = []
        for (let p in err.errors){
            err.message.push(err.error[p].properties.message)
        }
    }
    res.status(err.statusCode).json({
        status: 'Fail',
        message: err.message
    })
}