// const mongoose = require('mongoose')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id},process.env.JWT_SECRET, { expiresIn: '3d'})
}

//login
const loginUser = async (req, res) => {
    const { email, password } = req.body
        
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        const data = {
            _id : user._id,
            email : user.email,
            createdAt : user.createdAt,
            updateAt : user.updateAt
        }

        return res.status(200).json({ status: 'success', msg: 'user login', data, token })
    } catch (error) {
        return res.status(400).json({ status: 'error', msg: error.message })
    }
}

//sign up
const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signup(email, password)
        const token = createToken(user._id)
        const data = {
            _id : user._id,
            email : user.email,
            createdAt : user.createdAt,
            updateAt : user.updateAt
        }

        return res.status(200).json({ status: 'success', msg: 'user created', data, token })
    } catch (error) {
        return res.status(400).json({ status: 'error', msg: error.message })
    }
}

module.exports = { loginUser, signupUser }