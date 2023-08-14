module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define(
        "Orders",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            orderNumber: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            orderDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            quantity: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            total: {
                type: DataTypes.BIGINT,
                defaultValue: 0
            },
            statusOrder: {
                type: DataTypes.STRING
            },
            isActive: {
                type: DataTypes.INTEGER,
                defaultValue: 1
            },
            username : {
                type: DataTypes.STRING,
                allowNull: false,
                references : {
                  model: {
                    tableName: "users"
                  },
                  key: "username"
                }
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: {
                    tableName: "products"
                  },
                  key: "id"
                } 
            }
        },
        {
            tableName: "orders",
            timestamps: false,
            hooks : {
                afterCreate: (record, options) => {
                    delete record.dataValues.id
                },
                afterSave: (record, options) => {
                    delete record.dataValues.id,
                    delete record.dataValues.quantity,
                    delete record.dataValues.total,
                    delete record.dataValues.isActive,
                    delete record.dataValues.productId
                }
            }
        }
    );
    Orders.associate = (models) => {
        Orders.belongsTo(models.Users, {
            foreignKey: "username",
            as: "user"
        })
        Orders.belongsTo(models.Products, {
            foreignKey: "productId",
            as: "products"
        });
    };

    return Orders
}