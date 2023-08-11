const Contact = require("./Contact.js");

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define(
        "Users",
        {
            username: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            token: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: "users",
            timestamps: true,
            hooks : {
                afterCreate: (record, options) => {
                    delete record.dataValues.password,
                    delete record.dataValues.token
                },
                afterSave: (record, options) => {
                    delete record.dataValues.password,
                    delete record.dataValues.token
                }
            }
        }
    );
    Users.associate = (models) => {
        Users.hasOne(models.Contacts, {
            foreignKey: "username",
            as: "contacts"});
    };

    return Users
}