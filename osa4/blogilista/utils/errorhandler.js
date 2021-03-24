const app = require("../app")

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'ValidationError') {
        return response.status(400).send({error: 'invalid username: username has to exist, to be unique and have 3 or more characters'})
    }

    next(error)
}

module.exports = errorHandler