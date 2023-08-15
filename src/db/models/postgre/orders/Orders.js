const db = require("../../../../core");
const sequelize = db.sequelize.sequelize
const Sequelize = db.sequelize.Sequelize

const Orders = sequelize.define(
    "Orders",
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        orderNumber: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        orderDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        quantity: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        total: {
            type: Sequelize.BIGINT,
            defaultValue: 0
        },
        statusOrder: {
            type: Sequelize.STRING
        },
        isActive: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        username : {
            type: Sequelize.STRING,
            allowNull: false,
            references : {
              model: {
                tableName: "users"
              },
              key: "username"
            }
        },
        productId: {
            type: Sequelize.INTEGER,
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


module.exports = Orders