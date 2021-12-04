const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnrolledSchema = new Schema({
    estadoInscrito: {
        type: String,
        enum: ['', 'aceptada', 'rechazada'],
        default: ''
    },
    fIngreso: {
        type: Date
    },
    fEgreso: {
        type: Date
    },
    estudiante: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    proyecto: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
});

module.exports = mongoose.model("Enrolled", EnrolledSchema);