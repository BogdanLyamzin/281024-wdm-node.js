import { DataTypes } from "sequelize";

import sequelize from "./sequelize.js";

const Type = sequelize.define(
    "type",
    {
        name: {
            type: DataTypes.STRING,
        }
    }
);

// Type.sync();

export default Type;