const Sequelize = require("sequelize");
const repository = require("../models/repository");

module.exports = () => {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
    }
  );

  // try {
  sequelize
    .authenticate()
    .then(() => {
      repository.initialize(sequelize);
      // sequelize.sync()

      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
};
