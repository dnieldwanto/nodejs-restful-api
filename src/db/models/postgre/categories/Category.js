const db = require("../../../../core");
const { Products } = require("../products");
const sequelize = db.sequelize.sequelize;
const Sequelize = db.sequelize.Sequelize;

const Categories = sequelize.define(
    "Categories",
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        categoryName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING
        }
    },
    {
        tableName: "categories",
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

Categories.hasMany(Products, {
    foreignKey: "categoryId",
    as: "products"});


module.exports = Categories;