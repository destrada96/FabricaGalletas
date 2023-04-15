// Configuration for information like database credentials

// Link of our Node.js server with MySQL

const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
        host: "db4free.net",
        user: "equipo1",
        password: "equipoemidani",
        database: "galletasfab",
    },
    listPerPage: 10,
};

module.exports = config;