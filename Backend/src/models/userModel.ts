import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connectDB";

interface UserAttributes {
    id: number;
    username: string;
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public password!: string;

    // Timestamps are not defined
}

User.init(
    {
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
    },
    {
        tableName: "users",
        sequelize,
        timestamps: false, // Disable timestamps
    }
);

export default User;
