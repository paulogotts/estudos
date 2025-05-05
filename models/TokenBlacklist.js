export default (sequelize) => {
    return sequelize.define('TokenBlacklist', {
      token: {
        type: DataTypes.STRING(512),
        allowNull: false,
        unique: true
      },
      expiraEm: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  };