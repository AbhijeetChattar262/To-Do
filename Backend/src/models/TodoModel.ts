export class TodoDbModel{
    public static getModel(sequelize : any, DataTypes : any) {

        return sequelize.define("todos", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            task: {
                type: DataTypes.STRING,
                allowNull: false
            },
            completed: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            user_id_FK: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id"
                }
            },
        }, {
            sequelize,
            tableName: "todos",
            timestamps: false,
        });
    }

}