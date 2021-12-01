const Project = require('../models/project');

//HU_006. Listar todos los proyectos
getProjects = async () => {
    let projects = await Project.find();
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

module.exports = {
    getProjects,
    approveProject,
    updateProjectState,
    updateProjectPhase
};