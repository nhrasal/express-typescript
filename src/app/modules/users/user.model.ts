

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.NUMBER
    },
    email: {
      type: Sequelize.STRING
    }
  });

  return User;
};