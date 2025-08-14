const db = require("../../../../core");
const sequelize = db.sequelize.sequelize;
const Sequelize = db.sequelize.Sequelize;

const Carts = sequelize.define(
    "carts",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references : {
              model: {
                tableName: "products"
              },
              key: "id"
            }
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
              model: {
                tableName: "users"
              },
              key: "username"
            }
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        totalPayment: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: false
        }
    },
    {
        tableName: "carts",
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

Carts.associate = (models) => {
    Carts.belongsTo(models.Products, {
        foreignKey: "productId",
        as: "products"
    });
    Carts.belongsTo(models.Users, {
        foreignKey: "username",
        as: "users"
    });
};


module.exports = Carts;