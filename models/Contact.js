module.exports = (sequelize, DataTypes) => {
    const Contacts = sequelize.define(
        "Contacts",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING
            },
            email : {
                type: DataTypes.STRING
            },
            phone : {
                type: DataTypes.STRING
            },
            username : {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                references : {
                    model: {
                      tableName: "users"
                    },
                    key: "username"
                }
            }
        },
        {
            tableName: "contacts",
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
    Contacts.associate = (models) => {
        Contacts.belongsTo(models.Users, {
            foreignKey: "username",
            as: "user"
        });
        Contacts.hasMany(models.Address, {
            foreignKey: "contactId",
            as: "address"});
    }
    return Contacts
}