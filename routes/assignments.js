const express = require('express')
const router = express.Router()
const assignmentController = require('../controllers/assignments')
const studentController = require('../controllers/students')
const instructorController = require('../controllers/instructors')

module.exports = router