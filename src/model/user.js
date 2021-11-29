const mongoose = require('mongoose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        correo: {
            type: String,
        },
        documento: {
            type: String,
        },
        nombre: {
            type: String,
        },
        contrasenia: {
            type: String
        },
        tipo: {
            type: String,
            enum: ['estudiante', 'lider', 'administrador']
        },
        estado: {
            type: String,
            enum: ['pendiente', 'autorizado', 'no autorizado'],
            default: 'pendiente'
        }
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    }
);

module.exports = {
    UserSchema: mongoose.model("users", User),
    UserTC: composeWithMongoose(mongoose.model('user', User))
};