const Sequelize = require("sequelize");
const config = require("./config");

const db = new Sequelize(config.dbURI);

db.authenticate()
  .then(function() {
    console.log("Database connected successfully.");
  })
  .catch(function(err) {
    console.log("Database connection failed.");
    console.log(err);
  });

module.exports = db;
