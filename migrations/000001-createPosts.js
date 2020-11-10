module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("posts", {
      id: Sequelize.DataTypes.STRING,
      name: Sequelize.DataTypes.STRING,
      image: Sequelize.DataTypes.STRING,
    });

    await queryInterface.addIndex("posts", ["name", "image"], {
      unique: true,
      fields: ["name", "image"],
    });
  },
  down: (queryInterface, Sequelize) => {},
};
