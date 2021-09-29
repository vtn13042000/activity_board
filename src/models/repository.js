const createUserModel = require("./user");

class Repository {
  initialize(sequelize) {
    this.user = createUserModel(sequelize);
  }
}

module.exports = new Repository();
