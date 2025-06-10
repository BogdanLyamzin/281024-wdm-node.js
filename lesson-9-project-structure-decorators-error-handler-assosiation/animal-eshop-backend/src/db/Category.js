import { DataTypes } from "sequelize";

import sequelize from "./sequelize.js";

const Category = sequelize.define(
    "category",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
);

Category.associate = models => {
    Category.hasMany(models.Product, {
        foreignKey: "categoryId",
        as: "products",
    })
}

// Category.sync({force: true});

export default Category;