const { ProjectTC, ProjectSchema } = require('../model/project');

ProjectTC.addResolver({
    name: "create",
    kind: "mutation",
    type: ProjectTC.getResolver("createOne").getType(),
    args: ProjectTC.getResolver("createOne").getArgs(),
    resolve: async ({source, args, context, info}) => {
        const project = await ProjectSchema.create(args.record);

        return {
            record: project,
            recordId: ProjectTC.getRecordIdFn()(project),
        }
    }
});

const ProjectQuery = {
    projectById: ProjectTC.getResolver('findById'),
    projectByIds: ProjectTC.getResolver('findByIds'),
    projectOne: ProjectTC.getResolver('findOne'),
    projectMany: ProjectTC.getResolver('findMany'),
    projectCount: ProjectTC.getResolver('count'),
    projectConnection: ProjectTC.getResolver('connection'),
    projectPagination: ProjectTC.getResolver('pagination')
};

const ProjectMutation = {
    projectWithFile: ProjectTC.getResolver('create'),
    projectCreateOne: ProjectTC.getResolver('createOne'),
    projectCreateMany: ProjectTC.getResolver('createMany'),
    projectUpdateById: ProjectTC.getResolver('updateById'),
    projectUpdateOne: ProjectTC.getResolver('updateOne'),
    projectUpdateMany: ProjectTC.getResolver('updateMany'),
    projectRemoveById: ProjectTC.getResolver('removeById'),
    projectRemoveOne: ProjectTC.getResolver('removeOne'),
    projectRemoveMany: ProjectTC.getResolver('removeMany')
};

module.exports = {
    ProjectQuery,
    ProjectMutation
};