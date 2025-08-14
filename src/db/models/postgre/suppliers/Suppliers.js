const db = require("../../../../core");
const { Products } = require("../products");
const sequelize = db.sequelize.sequelize;
const Sequelize = db.sequelize.Sequelize;

const Suppliers = sequelize.define(
    "Suppliers",
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        supplierName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        supplierAddress: {
            type: Sequelize.STRING
        },
        supplierPhone: {
            type: Sequelize.STRING
        }
    },
    {
        tableName: "suppliers",
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
Suppliers.hasMany(Products, {
    foreignKey: "supplierId",
    as: "products"});

module.exports = Suppliers;