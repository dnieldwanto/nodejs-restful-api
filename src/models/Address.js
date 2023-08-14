module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define(
        "Address",
        { 
            id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true,
              allowNull: false
            },
            street: {
              type: DataTypes.STRING,
            },
            city: {
              type: DataTypes.STRING
            },
            province: {
              type: DataTypes.STRING
            },
            country: {
              type: DataTypes.STRING,
              allowNull: false
            },
            postalCode: {
              type: DataTypes.STRING,
              allowNull: false
            },
            contactId: {
              type: DataTypes.INTEGER,
              allowNull: false,
            }
        },
        {
            tableName: "address",
            timestamps: false,
            hooks : {
                afterCreate: (record, options) => {
                    delete record.dataValues.id
                },
                afterSave: (record, options) => {
                    delete record.dataValues.id
                }
            }
        }
    );
    Address.associate = (models) => {
      Address.belongsTo(models.Contacts, {
        foreignKey: "contactId",
        as: "contact"
      });
    }
    return Address
}