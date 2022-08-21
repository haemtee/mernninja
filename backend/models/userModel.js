const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true })

//static signup method
userSchema.statics.signup = async function (email, password) {
    if (!email || !password) {
        throw Error('All field must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const emailExist = await this.findOne({ email })
    if (emailExist) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}
//static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All field must be filled')
    }

    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Invalid user or password')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Invalid user or password')
    }

    return user
}



module.exports = mongoose.model('User', userSchema)