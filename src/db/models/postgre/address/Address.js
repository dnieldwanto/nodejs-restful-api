const db = require("../../../../core");
const sequelize = db.sequelize.sequelize;
const Sequelize = db.sequelize.Sequelize;

const Address = sequelize.define(
  "Address",
  { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      street: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      postalCode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contactId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
  },
  {
      tableName: "address",
      timestamps: false,
      hooks : {
          afterCreate: (record) => {
              delete record.dataValues.id;
          },
          afterSave: (record) => {
              delete record.dataValues.id;
          }
      }
  }
);
Address.associate = (models) => {
  Address.belongsTo(models.Contacts, {
    foreignKey: "contactId",
    as: "contacts"
  });
};

module.exports = Address;