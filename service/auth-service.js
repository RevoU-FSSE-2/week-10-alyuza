const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SIGN } = require('../config/jwt.js')

// ========== REGISTER
const validRoles = ["maker","approver"]

const register = async (req, res) => {
    const { username, password, role } = req.body

    try {
        if (username.trim(" ") === "" || username == null) {
            res.status(400).json({ message: "Username can't be blank and doesn't allow to enter of any special character" });
            return
        }
        if (!validRoles.includes(role)) {
            throw new Error("invalid role")
        }
        const user = await req.db.collection('users').findOne({ username }) // data 1 user dari DB
        if (user) {
            throw new Error('Sorry, username already exists')
        }

        const hashedPassword = await bcrypt.hash(password, 10) //hashedpass : password yg sudah di encrypted

        const newUser = await req.db.collection('users').insertOne({ username, password: hashedPassword, role })
        res.status(200).json({
            message: `User ${username} successfully registered`,
            data: newUser
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// =========== LOGIN
const login = async (req, res) => {
    const { username, password } = req.body
    const user = await req.db.collection('users').findOne({ username }) // dapet 1 username

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (isPasswordCorrect) {
        const token = jwt.sign({ username: user.username, role: user.role }, JWT_SIGN)
        res.status(200).json({
            message: 'User successfully logged in',
            data: token
        })
    } else {
        res.status(400).json({ error: 'Password is incorrect' })
    }
}

module.exports = {
    register,
    login
}