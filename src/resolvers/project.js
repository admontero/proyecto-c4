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
    EstadoInscrito: {
        NULA: '',
        ACEPTADA: 'aceptada',
        RECHAZADA: 'rechazada'
    },
    Query: {
        getProjects: async (parents, args) => {
            let projects = projectService.getProjects();
            return projects;
        },
        getProjectsByLeader: async (parents, args) => {
            let projects = projectService.getProjectsByLeader(args._id);
            return projects;
        },
        getInscribedByLeader: async (parents, args) => {
            let inscribed = projectService.getInscribedByLeader(args._id);
            return inscribed;
        },
        getProjectById: async (parents, args) => {
            let project = projectService.getProjectById(args._id);
            return project;
        },
        getProjectAdvances: async (parents, args) => {
            let advances = projectService.getProjectAdvances(args._id);
            return advances;
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
        },
        createProject: async (parents, args) => {
            let project = projectService.createProject(args);
            return project;
        },
        updateProject: async (parents, args) => {
            let projectUpdated = projectService.updateProject(args._id, args);
            return projectUpdated;
        },
        updateSignedState: async (parents, args) => {
            let projectUpdated = projectService.updateSignedState(args.projectId, args.inscribedId, args.estadoInscrito);
            return projectUpdated;
        },
        updateAdvanceRemark: async (parents, args) => {
            let projectUpdated = projectService.updateAdvanceRemark(args._id, args.advanceId, args.remark);
            return projectUpdated;
        },
        createInscription: async (parents, args) => {
            let projectUpdated = projectService.createInscription(args.projectId, args);
            return projectUpdated;
        },
        createAdvance: async (parents, args) => {
            let projectUpdated = projectService.createAdvance(args.projectId, args);
            return projectUpdated;
        },
        updateAdvanceDescription: async (parents, args) => {
            let projectUpdated = projectService.updateAdvanceDescription(args._id, args.advanceId, args.descripcion);
            return projectUpdated;
        }
    }
};

module.exports = {
    projectResolvers
}