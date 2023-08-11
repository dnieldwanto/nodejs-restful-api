module.exports = (sequelize, DataTypes) => {
    const Suppliers = sequelize.define(
        "Suppliers",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            supplierName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            supplierAddress: {
                type: DataTypes.STRING
            },
            supplierPhone: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: "suppliers",
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
    Suppliers.associate = (models) => {
        Suppliers.hasMany(models.Products, {
            foreignKey: "supplierId",
            as: "products"});
    };

    return Suppliers
}