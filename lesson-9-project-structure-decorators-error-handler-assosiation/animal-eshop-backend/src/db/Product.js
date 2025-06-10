import { DataTypes } from "sequelize";

import sequelize from "./sequelize.js";

import Category from "./Category.js";

const Product = sequelize.define(
    "product",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Category,
                key: "id"
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        }
    }
);

Product.associate = models => {
    Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "category"
    })
}

// Product.sync({force: true});


export default Product;