const db = require("../../../../core");
const Carts = require("../carts/Carts");
const { Contacts } = require("../contacts");
const sequelize = db.sequelize.sequelize;
const Sequelize = db.sequelize.Sequelize;

const Users = sequelize.define(
    "Users",
    {
        username: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        token: {
            type: Sequelize.STRING
        },
        roleId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references : {
                model: {
                    tableName: "user-roles"
                },
                key: "id"
            }
        },
        isActive: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        otpCode: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        tableName: "users",
        timestamps: true,
        hooks : {
            afterCreate: (record) => {
                delete record.dataValues.password,
                delete record.dataValues.token,
                delete record.dataValues.roleId,
                delete record.dataValues.isActive,
                delete record.dataValues.otpCode;
            },
            afterSave: (record) => {
                delete record.dataValues.password,
                delete record.dataValues.token,
                delete record.dataValues.roleId,
                delete record.dataValues.isActive,
                delete record.dataValues.otpCode;
            }
        }
    }
);

Users.associate = (models) => {
    Users.belongsTo(models.UserRoles, {
      foreignKey: "roleId",
      as: "roles"
    });
};

Users.hasOne(Contacts, {
    foreignKey: "username",
    as: "contacts"});

Users.hasMany(Carts, {
    foreignKey: "username",
    as: "carts"});


module.exports = Users;