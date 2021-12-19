const Project = require('../models/project');
const ObjectId = require('mongoose').Types.ObjectId

//HU_006. Listar todos los proyectos como administrador
//HU_019. Listar todos los proyectos como estudiante
getProjects = async () => {
    let projects = await Project.find({});
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
    let projects = await Project.find({ "lider.usuarioId": leaderId });
    return projects;
};

//HU_014. Actualizar información de proyecto
updateProject = async (projectId, project) => {
    let projectUpdated = await Project.findByIdAndUpdate(projectId, project, { new: true });
    return projectUpdated;
};

//HU_015. Listar solicitudes de inscripción de un lider
getInscribedByLeader = async (leaderId) => {
    let inscribed = await Project.aggregate([
        { "$match": { "lider.usuarioId": ObjectId(leaderId) }},
        { $unwind: "$inscritos" },
        { "$match": { "inscritos.estadoInscrito": "" } },
        { $group: { _id: null, inscritos: { $push: "$inscritos" } } },
        { $project: { _id: 0 } }
    ]);
    return inscribed[0]['inscritos'];
};

//HU_016. Aceptar o rechazar inscripciones (Cambio de estado de inscritos)
updateSignedState = async (projectId, inscribedId, estadoInscrito) => {
    if (estadoInscrito === 'aceptada') {
        let projectUpdated = await Project.findOneAndUpdate(
            { _id: ObjectId(projectId), "inscritos._id": ObjectId(inscribedId) },
            { $set: { "inscritos.$.estadoInscrito": estadoInscrito, "inscritos.$.fIngreso": Date.now() } },
            { new: true }
        );
        return projectUpdated;
    } else {
        let projectUpdated = await Project.findOneAndUpdate(
            { _id: ObjectId(projectId), "inscritos._id": ObjectId(inscribedId) },
            { $set: { "inscritos.$.estadoInscrito": estadoInscrito } },
            { new: true }
        );
        return projectUpdated;
    }
};

//HU_017. Ver información de proyecto más avances
getProjectById = async (projectId) => {
    let project = await Project.findById(projectId);
    return project;
};

//HU_018. Actualizar observaciones de un avance
updateAdvanceRemark = async (projectId, advanceId, observacion) => {
    let projectUpdated = await Project.findOneAndUpdate(
        { _id: projectId, "avances._id": advanceId }, 
        { $set: { "avances.$.observaciones": observacion } },
        { new: true }    
    );
    return projectUpdated;
};

//HU_020. Registrar inscripción a proyecto
createInscription = async (projectId, inscribed) => {
    let projectUpdated = await Project.findOneAndUpdate(
        { _id: projectId },
        { $push: { inscritos: { $each: [
            {
                nombre: inscribed.nombre,
                estadoInscrito: inscribed.estadoProyecto,
                fIngreso: inscribed.fIngreso,
                fEgreso: inscribed.fEgreso,
                usuarioId: inscribed.usuarioId
            }
        ] } } }
    );
    return projectUpdated;
};

//HU_021. Avances del proyecto al que estoy inscrito
getProjectAdvances = async (projectId) => {
    let advances = await Project.findById(projectId, { avances: 1, _id: 0 });
    return advances['avances'];
};

//HU_022. Registrar avance a proyecto
createAdvance = async (projectId, advance) => {
    let projectUpdated = await Project.findOneAndUpdate(
        { _id: projectId },
        { $push: { avances: { $each: [
            {
                fecha: advance.fecha,
                descripcion: advance.descripcion,
                observaciones: advance.observaciones
            }
        ] } } }
    );
    return projectUpdated;
};

//HU_023. Actualizar avance de proyecto
updateAdvanceDescription = async (projectId, advanceId, descripcion) => {
    let projectUpdated = await Project.findOneAndUpdate(
        { _id: projectId, "avances._id": advanceId }, 
        { $set: { "avances.$.descripcion": descripcion } },
        { new: true }    
    );
    return projectUpdated;
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
    updateSignedState,
    getProjectById,
    updateAdvanceRemark,
    createInscription,
    getProjectAdvances,
    createAdvance,
    updateAdvanceDescription
};