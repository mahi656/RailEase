const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
require('dotenv').config()
const SECRET = process.env.JWT_SECRET

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1d' })
        res.json({ message: 'Signup successful', token })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' })
    }
})

module.exports = router