const {
    HOST,
    DB_PORT,
    USER_DB,
    DATABASE,
    PASSWORD,
} = require("../../config/globals");

module.exports = {
    development: {
        client: "pg",
        version: "7.2",
        connection: {
            host: "localhost",
            user: "postgres",
            password: "1234",
            database: "CoderDB",
        },
    },
};