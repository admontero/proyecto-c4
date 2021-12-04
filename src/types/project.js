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
        lider: Lider
        presupuesto: Int
        estadoProyecto: EstadoProyecto
        fase: Fase
        inscritos: [Inscrito]
        avances: [Avance]
    }

    type Lider {
        documento: String!
        nombre: String!
        usuarioId: ID!
    }

    type Inscrito {
        _id: ID!,
        nombre: String!
        estadoInscrito: EstadoInscrito
        fIngreso: Date
        fEgreso: Date
        usuarioId: ID!
    }
    type Avance {
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
        ): [Inscrito]
        getProjectById(
            _id: ID!
        ): Project
        getProjectAdvances(
            _id: ID!
        ): [Avance]
    }

    input LiderInput {
        documento: String!
        nombre: String!
        usuarioId: ID!
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
            lider: LiderInput!
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
        updateSignedState(
            projectId: ID!
            inscribedId: ID!
            estadoInscrito: EstadoInscrito!
        ): Project
        updateAdvanceRemark(
            _id: ID!
            advanceId: ID!
            remark: String!
        ): Project
        createInscription(
            projectId: ID!
            nombre: String!
            estadoInscrito: EstadoInscrito
            fIngreso: Date
            fEgreso: Date
            usuarioId: ID!
        ): Project
        createAdvance(
            projectId: ID!
            fecha: Date
            descripcion: String
            observaciones: String
        ): Project
        updateAdvanceDescription(
            _id: ID!
            advanceId: ID!
            descripcion: String!
        ): Project
    }
`;

module.exports = { projectType };
