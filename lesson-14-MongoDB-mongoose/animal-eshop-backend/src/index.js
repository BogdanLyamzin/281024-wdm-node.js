import "dotenv/config";

import connectDatabase from "./db/connectDatabase.js";
import startServer from "./server.js";

const bootstrap = async()=> {
    await connectDatabase(); 
    startServer();
}

bootstrap();