const db = require("../../../../core");
const Carts = require("../carts/Carts");
const sequelize = db.sequelize.sequelize
const Sequelize = db.sequelize.Sequelize

const ProductsImage = sequelize.define(
    "ProductsImage",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        product_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            references: {
              model: {
                tableName: "products"
              },
              key: "id"
            }
        },
        original_filename: {
            type: Sequelize.STRING,
            allowNull: false
        },
        physical_filename: {
            type: Sequelize.STRING,
            allowNull: false
        },
        extension_filename: {
            type: Sequelize.STRING,
            allowNull: false
        },
        created_at: {
            type: Sequelize.DATE
        },
        updated_at: {
            type: Sequelize.DATE
        }
    },
    {
        tableName: "products_image",
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
ProductsImage.associate = (models) => {
    ProductsImage.belongsTo(models.Products, {
        foreignKey: "product_id",
        as: "products"
    });
};


module.exports = ProductsImage