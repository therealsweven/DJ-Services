const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config.js");

class Inquiry extends Model {}

Inquiry.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    package: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateCreated: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discount: {
      type: DataTypes.INTEGER,
    },
    dateOfEvent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    package: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    commMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "client",
        key: "id",
      },
    },
    notes: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "inquiry",
  }
);

module.exports = Inquiry;
