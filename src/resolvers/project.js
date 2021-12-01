const projectService = require('../services/project');

const projectResolvers = {
    EstadoProyecto: {
        INACTIVO: 'inactivo',
        ACTIVO: 'activo'
    },
    Fase: {
        NULA: '',
        INICIADO: 'iniciado',
        EN_DESARROLLO: 'en desarrollo',
        TERMINADO: 'terminado'
    },
    Query: {
        getProjects: async (parents, args) => {
            let projects = projectService.getProjects();
            return projects;
        }
    },
    Mutation: {
        approveProject: async (parents, args) => {
            let projectApproved = projectService.approveProject(args._id);
            return projectApproved;
        },
        updateProjectState: async (parents, args) => {
            let projectUpdated = projectService.updateProjectState(args._id, args.estadoProyecto);
            return projectUpdated;
        },
        updateProjectPhase: async (parents, args) => {
            let projectUpdated = projectService.updateProjectPhase(args._id, args.fase);
            return projectUpdated;
        }
    }
};

module.exports = {
    projectResolvers
}