const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
    {
        nombre: {
            type: String
        },
        oGenerales: {
            type: String
        },
        oEspecificos: {
            type: String
        },
        fInicio: {
            type: Date
        },
        fTerminacion: {
            type: Date
        },
        lider: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        presupuesto: {
            type: Number
        },
        estadoProyecto: {
            type: String,
            enum: ['inactivo', 'activo'],
            default: 'inactivo'
        },
        fase: {
            type: String,
            enum: ['', 'iniciado', 'en desarrollo', 'terminado'],
            default: ''
        },
        inscritos: [{
            type: Schema.Types.ObjectId,
            ref: 'Enrolled'
        }],
        avances: [{
            type: Schema.Types.ObjectId,
            ref: 'Advance'
        }]
    }
);

module.exports = mongoose.model("Project", ProjectSchema);