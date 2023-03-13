const { stack } = require("../routers/userRouts")

const errorHandler = (err, req, res, next) => {
    const statusCoode = res.statusCoode ? res.statusCoode : 500

    res.status(statusCoode)

    res.json({
        message : err.message,
        stack : process.env.NODE_ENV === 'production' ? null : err.stack

    })
}

module.exports = {
    errorHandler,
}