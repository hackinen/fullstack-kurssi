const app = require("../app")

const errorHandler = (error, request, response, next) => {
    //console.log(error.message)

    if (error.name === 'ValidationError') {
        return response.status(400).send({error: 'invalid username'})
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
        error: 'invalid token'
    })}

    next(error)
}

module.exports = errorHandler