const { gql } = require('apollo-server-express');

const projectType = gql`

    scalar Date

    enum EstadoProyecto {
        INACTIVO
        ACTIVO
    }

    enum Fase {
        NULA
        INICIADO
        EN_DESARROLLO
        TERMINADO
    }

    enum EstadoInscrito {
        NULA
        ACEPTADA
        RECHAZADA
    }

    type Project {
        _id: ID!
        nombre: String!
        oGenerales: String
        oEspecificos: String
        fInicio: Date
        fTerminacion: Date
        lider: User
        presupuesto: Int
        estadoProyecto: EstadoProyecto
        fase: Fase
        inscritos: [Enrolled]
        avances: [Advance]
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

    type Enrolled {
        estadoInscrito: EstadoInscrito
        fIngreso: Date
        fEgreso: Date
        estudiante: User
    }

    type Advance {
        _id: ID!
        fecha: Date
        descripcion: String
        observaciones: String
    }

    type Query {
        getProjects: [Project]
        getProjectsByLeader(
            _id: ID!
        ): [Project]
        getInscribedByLeader(
            _id: ID!
        ): [Enrolled]
        getProjectById(
            _id: ID!
        ): Project
        getProjectAdvances(
            _id: ID!
        ): [Advance]
    }

    type Mutation {
        approveProject(
            _id: ID!
        ): Project
        updateProjectState(
            _id: ID!
            estadoProyecto: EstadoProyecto!
        ): Project
        updateProjectPhase(
            _id: ID!
            fase: Fase!
        ): Project
        createProject(
            nombre: String!
            oGenerales: String!
            oEspecificos: String!
            fInicio: Date
            fTerminacion: Date
            lider: String!
            presupuesto: Int!
            estadoProyecto: EstadoProyecto
            fase: Fase
        ): Project
        updateProject(
            _id: ID!
            nombre: String
            oGenerales: String
            oEspecificos: String
            fInicio: Date
            fTerminacion: Date
            lider: String
            presupuesto: Int
        ): Project
        updateProjectAdvanceRemark(
            _id: ID!
            remarkId: ID!
            remark: String!
        ): Project
        createInscription(
            estadoInscrito: EstadoInscrito
            fIngreso: Date
            fEgreso: Date
            estudiante: String!
            proyecto: String!
        ): Enrolled
    }
`;

module.exports = { projectType };
