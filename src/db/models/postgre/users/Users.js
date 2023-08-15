const db = require("../../../../core");
const { Contacts } = require("../contacts");
const { Orders } = require("../orders");
const sequelize = db.sequelize.sequelize
const Sequelize = db.sequelize.Sequelize

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

Users.hasOne(Contacts, {
    foreignKey: "username",
    as: "contacts"});
Users.hasMany(Orders, {
    foreignKey: "username",
    as: "orders"
})


module.exports = Users