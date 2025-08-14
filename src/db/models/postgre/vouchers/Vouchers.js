const db = require("../../../../core");
const sequelize = db.sequelize.sequelize;
const Sequelize = db.sequelize.Sequelize;

const Vouchers = sequelize.define(
    "vouchers",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        voucherCode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        discountVoucher: {
            type: Sequelize.DOUBLE,
            allowNull: false
        }
    },
    {
        tableName: "vouchers",
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


module.exports = Vouchers;