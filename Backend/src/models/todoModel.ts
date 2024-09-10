import { DataTypes,Model,Optional }  from "sequelize";
import sequelize from "../db/connectDB";


interface TodoAttributes {
    id: number;
    task: string;
    completed: boolean;
    user_id_FK: number;
}

interface TodoCreationAttributes extends Optional<TodoAttributes, "id"> {}

class Todo extends Model<TodoAttributes, TodoCreationAttributes> implements TodoAttributes {
    id!: number;
    task!: string;
    completed!: boolean;
    user_id_FK!: number;
}

Todo.init(
    {
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
        }
    },
    {
        sequelize,
        tableName: "todos",
        timestamps: false,
    }
);

export default Todo;
