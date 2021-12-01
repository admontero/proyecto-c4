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
        estadoInscrito: String
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
    }
`;

module.exports = { projectType };
