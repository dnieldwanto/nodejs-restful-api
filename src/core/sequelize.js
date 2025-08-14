const Sequelize = require("sequelize");
const config = require("config");
const dev = config.get("development").database.postgres;
const db = {};

const sequelize = new Sequelize(
  dev.database,
  dev.username,
  dev.password,
  {
    dialect: dev.dialect,
    host: dev.host,
    port: dev.port,
    schema: dev.schema,
    pool: {
      max: 10,
      min: 0,
      idle: 200000,
      acquire: 1000000,
    }
  }
);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;