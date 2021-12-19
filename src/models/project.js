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
            documento: {
                type: String
            },
            nombre: {
                type: String
            },
            usuarioId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
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
        inscritos: [
            {
                nombre: {
                    type: String
                },
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
                usuarioId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                }
            }
        ],
        avances: [
            {
                fecha: {
                    type: Date
                },
                descripcion: {
                    type: String
                },
                observaciones: {
                    type: String
                }
            }
        ]
    }
);

module.exports = mongoose.model("Project", ProjectSchema);