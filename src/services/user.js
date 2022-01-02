const User = require('../models/user');
const Project = require('../models/project');

//HU_001. Registro de usuario
createUser = async (user) => {
    let newUser = new User(user);
    user = await newUser.save();
    return user;
};

//HU_002. Autenticar usuario
authUser = async (correo, contrasenia) => {
    let user = await User.findOne({ correo, contrasenia });
    return user;
};

//HU_003. Actualizar informacion del usuario
updateUser = async (userId, user) => {
    let userUpdated = await User.findByIdAndUpdate(userId, user, { new: true });
    //Actualizamos el documento y nombre del lider en la colección de proyectos
    await Project.updateMany(
        { "lider.usuarioId": userId }, 
        { $set: { "lider.documento": user.documento, "lider.nombre": user.nombre } }
    );
    return userUpdated;
};

//HU_004. Listar todos los usuarios
getUsers = async () => {
    let users = await User.find();
    return users;
};

//HU_005. Cambiar estado de usuario
updateUserState = async (userId, estadoUsuario) => {
    let userUpdated = await User.findByIdAndUpdate(userId, { estadoUsuario }, { new: true });
    return userUpdated;
};

//HU_010. Listar estudiantes de la plataforma
getStudents = async () => {
    let students = await User.find({ tipo: 'estudiante' });
    return students;
};

//HU_011. Autorizar estudiante (cambiar estado a autorizado)
authorizeStudent = async (userId) => {
    let student = await User.findByIdAndUpdate(userId, { estadoUsuario: 'autorizado' }, { new: true });
    return student;
};

module.exports = {
    createUser,
    authUser,
    updateUser,
    getUsers,
    updateUserState,
    getStudents,
    authorizeStudent
}