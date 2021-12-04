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
        updateProjectAdvanceRemark: async (parents, args) => {
            let projectUpdated = projectService.updateProjectAdvanceRemark(args._id, args.remarkId, args.remark);
            return projectUpdated;
        },
        createInscription: async (parents, args) => {
            let projectUpdated = projectService.createInscription(args);
            return projectUpdated;
        }
    }
};

module.exports = {
    projectResolvers
}