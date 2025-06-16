import "dotenv/config";


import { connectDatabase } from "./db/sequelize.js";
import startServer from "./server.js";
import "./db/associates.js";

import Type from "./db/Type.js";
import Movie from "./db/Movie.js";

const bootstrap = async()=> {
    await connectDatabase(); 
    startServer();
    const result = await Movie.findAll({
        include: {
            model: Type,
            as: "type"
        }
    });
    console.log(result);
    // await Type.create({name: "film"})
    // await Movie.create({name: "Avatar", typeId: 2})
}

bootstrap(); 