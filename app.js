const express = require('express')
const morgan = require('morgan')
const assignmentRoutes = require('./routes/assignments')
const studentRoutes = require('./routes/students')
const instructorRoutes = require('./routes/instructors')
const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use('/assignments', assignmentRoutes)
app.use('/students', studentRoutes)
app.use('/instructors', instructorRoutes)

module.exports = app