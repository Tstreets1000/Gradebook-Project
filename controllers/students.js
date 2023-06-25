const Student = require('../models/student')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '')
        const data = jwt.verify(token, process.env.SECRET)
        const student = await Student.findOne({ _id: data._id })
        if(!student) {
            throw new Error('Bad Credentials')
        }
        req.student = student
        next()
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

exports.createStudent = async (req, res) => {
    try {
        const student = new Student(req.body)
        await student.save()
        const token = await student.generateAuthToken()
        res.json({ student, token })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.loginStudent = async (req, res) => {
    try {
        const student = await Student.findOne({ email: req.body.email })
        if(!student || !await bcrypt.compare(req.body.password, student.password )) {
            throw new Error('Invalid Login Credentials')
        } else {
            const token = await student.generateAuthToken()
            res.json({ student, token })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.updateStudent = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        updates.forEach(update => req.user[update] = req.body[update])
        await req.student.save()
        res.json(student)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteStudent = async (req, res) => {
    try {
        await req.student.deleteOne()
        res.sendStatus(204)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}