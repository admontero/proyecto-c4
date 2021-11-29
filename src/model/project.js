const mongoose = require('mongoose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const Schema = mongoose.Schema;

const Project = new Schema(
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
                type: mongoose.Schema.Types.ObjectId
            }
        },
        presupuesto: {
            type: Number
        },
        estado: {
            type: String,
            enum: ['inactivo', 'activo'],
            default: 'inactivo'
        },
        fase: {
            type: String,
            enum: ['iniciado', 'en desarrollo', 'terminado'],
        },
        inscritos: [
            {
                nombre: {
                    type: String
                },
                estado: {
                    type: String,
                    enum: ['aceptada', 'rechazada']
                },
                fIngreso: {
                    type: Date
                },
                fEgreso: {
                    type: Date
                },
                usuarioId: {
                    type: mongoose.Schema.Types.ObjectId
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

module.exports = {
    ProjectSchema: mongoose.model("projects", Project),
    ProjectTC: composeWithMongoose(mongoose.model('project', Project))
}