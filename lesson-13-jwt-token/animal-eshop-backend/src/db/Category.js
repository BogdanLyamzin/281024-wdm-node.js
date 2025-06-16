import { DataTypes } from "sequelize";

import sequelize from "./sequelize.js";

const Category = sequelize.define(
    "category",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: {
                args: true,
                msg: "Category with this name already exist"
            },
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
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }
);

// Category.sync();

export default Category;
