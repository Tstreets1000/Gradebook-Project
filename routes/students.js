const express = require('express')
const router = express.Router()
const assignmentController = require('../controllers/assignments')
const studentController = require('../controllers/students')
const instructorController = require('../controllers/instructors')


router.post('/', studentController.createStudent)
router.post('/login', studentController.loginStudent)
router.put('/:id', studentController.auth, studentController.updateStudent)
router.delete('/:id', studentController.auth, studentController.deleteStudent)

module.exports = router