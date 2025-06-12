import { DataTypes } from "sequelize";

import sequelize from "./sequelize.js";

const Category = sequelize.define(
    "category",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: [2],
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [50],
            }
        },
        // image: {
        //     type: DataTypes.STRING,
        //     defaultValue: "https://example.com/1.png",
        //     allowNull: false,
        // }
    }
);

// Category.sync({alter: true});

export default Category;