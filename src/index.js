require('dotenv').config({ path: '.env' });
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const { resolvers } = require('./resolvers');
const { types } = require('./types');
const { GraphQLScalarType } = require('graphql');

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    parseValue(value) {
        return new Date(value);
    },
    serialize(value) {
        return value.toISOString();
    },
});

const app = express();
const server = new ApolloServer({
    typeDefs: types,
    Date: dateScalar,
    resolvers: resolvers
});

const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB = process.env.MONGO_DB;

const DB_URL = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;

if (process.env.NODE_ENV === 'production') {
    mongoose.connect(DB_URL, async () => {
        console.log("conexión exitosa a la base de datos");
        app.listen(process.env.PORT || 5000, async () => {
            await server.start();
            server.applyMiddleware({ app });
            console.log("Corriendo en el puerto 5000...");
        });
    });
} else {
    mongoose.connect(process.env.DB_MONGO, async () => {
        console.log("conexión exitosa a la base de datos");
        app.listen(process.env.PORT || 5000, async () => {
            await server.start();
            server.applyMiddleware({ app });
            console.log("Corriendo en el puerto 5000...");
        });
    });
}
