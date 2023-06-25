const Instructor = require('../models/instructor')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '')
        const data = jwt.verify(token, process.env.SECRET)
        const instructor = await Instructor.findOne({ _id: data._id })
        if(!instructor) {
            throw new Error('Bad Credentials')
        }
        req.instructor = instructor
        next()
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

exports.createInstructor = async (req, res) => {
    try {
        const instructor = new Instructor(req.body)
        await instructor.save()
        const token = await teacher.generateAuthToken()
        res.json({ instructor, token })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.loginInstructor = async (req, res) => {
    try {
        const instructor = await Instructor.findOne({ email: req.body.email })
        if(!instructor || !await bcrypt.compare(req.body.password, instructor.password )) {
            throw new Error('Invalid Login Credentials')
        } else {
            const token = await instructor.generateAuthToken()
            res.json({ instructor, token })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.updateInstructor = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        updates.forEach(update => req.user[update] = req.body[update])
        await req.instructor.save()
        res.json(instructor)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteInstructor = async (req, res) => {
    try {
        await req.instructor.deleteOne()
        res.sendStatus(204)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}