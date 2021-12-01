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
        getUserById: async (parents, args) => {
            let user = userService.getUserById(args._id);
            return user;
        }
    },
    Mutation: {
        createUser: async (parents, args) => {
            let user = userService.createUser(args);
            return user;
        },
        updateUser: async (parents, args) => {
            let userUpdated = userService.updateUser(args._id, args)
            return userUpdated;
        },
        updateUserState: async (parents, args) => {
            let userUpdated = userService.updateUserState(args._id, args.estadoUsuario)
            return userUpdated;
        }
    }
};

module.exports = {
    userResolvers
}