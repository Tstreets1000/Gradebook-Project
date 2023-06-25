const { model, Schema } = require('mongoose')

const assignmentSchema = new mongoose.Schema({
    assignment: { type: String, required: true },
    completed: { type: Boolean, required: true }
}, {
    timestamps: true
})

const Assignment = model('Assignment', assignmentSchema)

module.exports = Assignment