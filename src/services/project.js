const Project = require('../models/project');
const Enrolled = require('../models/enrolled');
const ObjectId = require('mongoose').Types.ObjectId

//HU_006. Listar todos los proyectos como administrador
//HU_019. Listar todos los proyectos como estudiante
getProjects = async () => {
    let projects = await Project.find({})
        .populate({
            path: 'lider', 
            select: { 'documento': 1, 'nombre': 1 }
        }).populate({
            path: 'inscritos',
            populate: {
                path: 'estudiante',
                select: { 'nombre': 1 }
            }
    });
    return projects;
};

//HU_007. Aprobar proyecto (Cambiar estado a activo)
approveProject = async (projectId) => {
    let projectApproved = await Project.findByIdAndUpdate(projectId, { estadoProyecto: 'activo' }, { new: true });
    return projectApproved;
};

//HU_008. Actualizar estado de proyecto
updateProjectState = async (projectId, estadoProyecto) => {
    let projectUpdated = await Project.findByIdAndUpdate(projectId, { estadoProyecto }, { new: true });
    return projectUpdated;
};

//HU_009. Actualizar fase de proyecto
updateProjectPhase = async (projectId, fase) => {
    let projectUpdated = await Project.findByIdAndUpdate(projectId, { fase }, { new: true });
    return projectUpdated;
};

//HU_012. Crear un nuevo proyecto
createProject = async (project) => {
    let newProject = new Project(project);
    project = await newProject.save();
    return project;
};

//HU_013. Listar proyectos de un líder
getProjectsByLeader = async (leaderId) => {
    let projects = await Project.find({ "lider": leaderId });
    return projects;
};

//HU_014. Actualizar información de proyecto
updateProject = async (projectId, project) => {
    let projectUpdated = await Project.findByIdAndUpdate(projectId, project, { new: true });
    return projectUpdated;
};

//HU_015. Listar solicitudes de inscripción de un lider
getInscribedByLeader = async (leaderId) => {
    let projectIds = [];
    let projects = await Project.find({ "lider": leaderId });
    projects.map(p => projectIds.push(p._id.toString()));
    let inscribed = await Enrolled.find({ estadoInscrito: '' }).populate('estudiante', { 'nombre': 1 });
    return inscribed.filter(i => projectIds.includes(i.proyecto.toString()));
};

//HU_016. Aceptar o rechazar inscripciones (Cambio de estado de inscritos)
/* updateProjectSignedState = async (leaderId, studentId, estadoInscrito) => {
    let projectUpdated = await Project.find
}; */

//HU_017. Ver información de proyecto más avances
getProjectById = async (projectId) => {
    let project = await Project.findById(projectId);
    return project;
};

//HU_018. Actualizar observaciones de un avance
updateProjectAdvanceRemark = async (projectId, remarkId, observacion) => {
    let projectUpdated = await Project.findOneAndUpdate(
        { _id: projectId, "avances._id": remarkId }, 
        { $set: { "avances.$.observaciones": observacion } },
        { new: true }    
    );
    return projectUpdated;
};

//HU_020. Registrar inscripción a proyecto
createInscription = async (enrolled) => {
    let newEnrolled = new Enrolled(enrolled);
    enrolledCreated = await newEnrolled.save();
    await addEnrolledToProject(enrolled['proyecto'], enrolledCreated['_id']);
    return enrolledCreated;
};

getProjectAdvances = async (projectId) => {
    let advances = await Project.findById(projectId).populate('avances');
    return advances;
};

//OTROS
addEnrolledToProject = async (proyectoId, enrolledId) => {
    let project = await Project.findByIdAndUpdate(proyectoId, {
        $push: { inscritos: enrolledId }
    });

    return project;
};

module.exports = {
    getProjects,
    approveProject,
    updateProjectState,
    updateProjectPhase,
    createProject,
    getProjectsByLeader,
    updateProject,
    getInscribedByLeader,
    getProjectById,
    updateProjectAdvanceRemark,
    createInscription,
    getProjectAdvances
};