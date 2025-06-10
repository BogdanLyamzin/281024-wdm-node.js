import { DataTypes } from "sequelize";

import sequelize from "./sequelize.js";

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
        // category: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: "Categories",
        //         key: "id"
        //     },
        //     onUpdate: "CASCADE",
        //     onDelete: "SET NULL",
        // }
    }
);

// Product.sync();

export default Product;