require('dotenv').config({ path: '.env' });
const winston = require('winston');
const expressWinston = require('express-winston');
require('winston-mongodb');

const logger = function (req, res, next) {
    expressWinston.logger({
        transports: [
            new winston.transports.MongoDB({
                db: process.env.DB_MONGO,
                options: { useUnifiedTopology: true },
                metaKey: "meta"
            })
        ],
        format: winston.format.json({
            space: 2
        }),
        meta: true,
        msg: "HTTP {{ req.method }} {{ req.url }}",
        expressFormat: true,
        colorize: true
    });
    next();
};

module.exports = logger;