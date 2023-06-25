require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
    assignment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }]
})

studentSchema.pre('save', async function(next){
    this.isModified('password')?
    this.password = await bcrypt.hash(this.password, 8):
    null;
    next()
})

studentSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({ _id: this._id }, process.env.SECRET)
    return token
}

const Student = mongoose.model('Student', studentSchema)

module.exports = Student