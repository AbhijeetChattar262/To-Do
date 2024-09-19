export class UserDbModel{
    public static getModel(sequelize : any, DataTypes : any) {
        return sequelize.define("users", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: "users",
            timestamps: false,
        });
    }
}
        
