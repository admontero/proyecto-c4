const userService = require('../services/user');

const userResolvers = {
    Tipo: {
        ADMINISTRADOR: 'administrador',
        LIDER: 'lider',
        ESTUDIANTE: 'estudiante'
    },
    EstadoUsuario: {
        PENDIENTE: 'pendiente',
        AUTORIZADO: 'autorizado',
        NO_AUTORIZADO: 'no autorizado'
    },
    Query: {
        authUser: async (parents, args) => {
            let user = userService.authUser(args.correo, args.contrasenia);
            return user;
        },
        getUsers: async (parents, args) => {
            let users = userService.getUsers();
            return users;
        },
        getStudents: async (parents, args) => {
            let students = userService.getStudents();
            return students;
        },
    },
    Mutation: {
        createUser: async (parents, args) => {
            let user = userService.createUser(args);
            return user;
        },
        updateUser: async (parents, args) => {
            let userUpdated = userService.updateUser(args._id, args);
            return userUpdated;
        },
        updateUserState: async (parents, args) => {
            let userUpdated = userService.updateUserState(args._id, args.estadoUsuario);
            return userUpdated;
        },
        authorizeStudent: async (parents, args) => {
            let student = userService.authorizeStudent(args._id);
            return student;
        }
    }
};

module.exports = {
    userResolvers
}