module.exports = (sequelize, DataTypes) => {
    const Categories = sequelize.define(
        "Categories",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            categoryName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: "categories",
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
    Categories.associate = (models) => {
        Categories.hasMany(models.Products, {
            foreignKey: "categoryId",
            as: "products"});
    };

    return Categories
}