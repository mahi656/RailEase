const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// Import routes
const loginRoute = require('./routes/Login')
const registerRoute = require('./routes/Register')

// Use routes
app.use('/', loginRoute)
app.use('/', registerRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
