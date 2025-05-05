export default (sequelize) => {
    return sequelize.define('RefreshToken', {
      token: {
        type: DataTypes.STRING(512),
        allowNull: false
      },
      expiraEm: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  };