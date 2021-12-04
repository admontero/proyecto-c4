const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdvanceSchema = new Schema({
    fecha: {
        type: Date
    },
    descripcion: {
        type: String
    },
    observaciones: {
        type: String
    },
    proyecto: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
});

module.exports = mongoose.model("Advance", AdvanceSchema)

