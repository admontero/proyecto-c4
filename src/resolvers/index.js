const { projectResolvers } = require('./project');
const { userResolvers } = require('./user');

const resolvers = [ projectResolvers, userResolvers ];

module.exports = {
    resolvers
};