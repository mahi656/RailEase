const express = require('express')
const app = express()
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
require('dotenv').config()
const SECRET = process.env.JWT_SECRET
app.use(express.json())

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
      where: { email: email }
    })
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET,
      { expiresIn: '1d' }
    )

    return res.json({
      message: "Login successful",
      token: token
    })

  } 
  catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Server error" })
  }
})
app.listen(3001, () => {
  console.log("Server is running on port 3000")
})
