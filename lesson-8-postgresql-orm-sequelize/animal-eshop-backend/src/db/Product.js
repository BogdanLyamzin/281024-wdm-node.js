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
        }
    }
);

// Product.sync();

export default Product;