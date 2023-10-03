const db = require("../../../../core");
const sequelize = db.sequelize.sequelize
const Sequelize = db.sequelize.Sequelize

const Products = sequelize.define(
    "Products",
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        productName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.BIGINT,
            defaultValue: 0
        },
        stock: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        categoryId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: {
                tableName: "categories"
              },
              key: "id"
            }
        },
        supplierId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: {
                tableName: "suppliers"
              },
              key: "id"
            }
        }
    },
    {
        tableName: "products",
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
Products.associate = (models) => {
    Products.belongsTo(models.Categories, {
        foreignKey: "categoryId",
        as: "categories"
    })
    Products.belongsTo(models.Suppliers, {
        foreignKey: "supplierId",
        as: "suppliers"
    });
};


module.exports = Products