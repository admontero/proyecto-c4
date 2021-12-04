const { gql } = require('apollo-server-express');

const userType = gql`

    enum Tipo {
        ADMINISTRADOR
        LIDER
        ESTUDIANTE
    }

    enum EstadoUsuario {
        PENDIENTE
        AUTORIZADO
        NO_AUTORIZADO
    }

    type User {
        _id: ID!
        correo: String!
        documento: String!
        nombre: String!
        contrasenia: String!
        tipo: Tipo!
        estadoUsuario: EstadoUsuario
    }

    type Query {
        authUser(
            correo: String! 
            contrasenia: String!
        ): User
        getUsers: [User]
        getStudents: [User]
        getUserById(
            _id: ID!
        ): User
    }

    type Mutation {
        createUser(
            correo: String!
            documento: String!
            nombre: String!
            contrasenia: String!
            tipo: String!
            estadoUsuario: String
        ): User
        updateUser(
            _id: ID!
            correo: String
            documento: String
            nombre: String
            contrasenia: String
            estadoUsuario: String
        ): User
        updateUserState(
            _id: ID!
            estadoUsuario: String!
        ): User
        authorizeStudent(
            _id: ID!
        ): User
    }
`;

module.exports = { userType };