import { DataTypes } from "sequelize";

import sequelize from "./sequelize.js";

const Movie = sequelize.define(
    "movie",
    {
        name: {
            type: DataTypes.STRING,
        },
        typeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "types",
                key: "id"
            }
        }
    }
);

// Movie.sync({alter: true});

export default Movie;