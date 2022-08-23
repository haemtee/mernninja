const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ status: "error", msg: 'Auth required' })
    }
    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = userModel.findOne({ _id }).select({ _id })

        next()

    } catch (error) {
        console.log(error);
        return res.status(401).json({ status: "error", msg: 'Auth failed' })
    }

}

module.exports = requireAuth