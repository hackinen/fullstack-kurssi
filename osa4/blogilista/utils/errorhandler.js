const app = require("../app")

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'ValidationError') {
        return response.status(400).send({error: 'invalid username'})
    }

    next(error)
}

module.exports = errorHandler