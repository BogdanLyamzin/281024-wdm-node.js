import "dotenv/config";

import { connectDatabase } from "./db/sequelize.js";
import startServer from "./server.js";

const bootstrap = async()=> {
    await connectDatabase(); // throw new Error()
    startServer();
}

bootstrap(); // throw new Error()