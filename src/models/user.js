const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
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
        estadoUsuario: {
            type: String,
            enum: ['pendiente', 'autorizado', 'no autorizado'],
            default: 'pendiente'
        }
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    }
);

module.exports = mongoose.model("User", UserSchema);