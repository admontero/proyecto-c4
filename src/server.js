require('dotenv').config({ path: '.env' });
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const logger = require('./core/logger');
const extensions = ({ context }) => {
    return {
        runTime: Date.now() - context.startTime,
    };
};

app.use(logger);

app.listen(5000, async () => {
    console.log('El servidor está corriendo en el puerto: ', 5000);
    await mongoose.connect(process.env.DB_MONGO), {
        useNewUrlParse: true,
        useUnifiedTopology: true
    };
});

mongoose.connection.on(
    "error",
    console.error.bind(console, "Mongoose Database connection error")
);

const graphqlSchema = require('./schema/index');

app.use('/graphql', graphqlHTTP(request => {
    return {
        context: { startTime: Date.now() },
        graphiql: true,
        schema: graphqlSchema,
        extensions
    };
}));