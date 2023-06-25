require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const instructorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    assignment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
    student: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
})

instructorSchema.pre('save', async function(next){
    this.isModified('password')?
    this.password = await bcrypt.hash(this.password, 8):
    null;
    next()
})

instructorSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({ _id: this._id }, process.env.SECRET)
    return token
}

const Instructor = mongoose.model('Instructor', instructorSchema)

module.exports = Instructor