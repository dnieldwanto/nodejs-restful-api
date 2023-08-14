module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define(
        "Products",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            productName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price: {
                type: DataTypes.BIGINT,
                defaultValue: 0
            },
            stock: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: {
                    tableName: "categories"
                  },
                  key: "id"
                }
            },
            supplierId: {
                type: DataTypes.INTEGER,
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
        Products.hasMany(models.Orders, {
            foreignKey: "productId",
            as: "orders"
        });
    };

    return Products
}