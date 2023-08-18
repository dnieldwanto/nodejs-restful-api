const db = require("../../../../core");
const Users = require("../users/Users");
const sequelize = db.sequelize.sequelize
const Sequelize = db.sequelize.Sequelize

const UserRoles = sequelize.define(
    "UserRoles",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        roleName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: Sequelize.STRING,
        }
    },
    {
        tableName: "user-roles",
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
UserRoles.hasOne(Users, {
    foreignKey: "roleId",
    as: "roles"});


module.exports = UserRoles