module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("posts", "position", {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0,
    });

    await queryInterface.changeColumn("posts", "position", {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false,
    });
  },
  down: (queryInterface, Sequelize) => {},
};
