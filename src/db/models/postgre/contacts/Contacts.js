const db = require("../../../../core");
const { Address } = require("../address");
const sequelize = db.sequelize.sequelize
const Sequelize = db.sequelize.Sequelize

const Contacts = sequelize.define(
    "Contacts",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING
        },
        email : {
            type: Sequelize.STRING
        },
        phone : {
            type: Sequelize.STRING
        },
        username : {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            references : {
                model: {
                  tableName: "users"
                },
                key: "username"
            }
        }
    },
    {
        tableName: "contacts",
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
Contacts.associate = (models) => {
    Contacts.belongsTo(models.Users, {
        foreignKey: "username",
        as: "user"
    });
}

Contacts.hasMany(Address, {
    foreignKey: "contactId",
    as: "address"});


module.exports = Contacts