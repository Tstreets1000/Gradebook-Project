const express = require('express')
const router = express.Router()
const assignmentController = require('../controllers/assignments')
const studentController = require('../controllers/students')
const instructorController = require('../controllers/instructors')

router.post('/', instructorController.createInstructor)
router.post('/login', instructorController.loginInstructor)
router.put('/:id', instructorController.auth, instructorController.updateInstructor)
router.delete('/:id', instructorController.auth, instructorController.deleteInstructor)

module.exports = router 