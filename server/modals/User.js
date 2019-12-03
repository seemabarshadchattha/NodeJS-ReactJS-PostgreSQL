const Sequelize = require("sequelize");
const db = require("../config/db");

const Users = db.define("Users", {
  userid: { type: Sequelize.STRING(225) },
  firstname: { type: Sequelize.STRING(225) },
  lastname: { type: Sequelize.STRING(225) },
  address: { type: Sequelize.STRING(225) },
  phone: { type: Sequelize.STRING(225) }
});

module.exports = Users;
