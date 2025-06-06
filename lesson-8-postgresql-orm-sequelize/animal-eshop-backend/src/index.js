import "dotenv/config";

import { connectDatabase } from "./db/sequelize.js";
import startServer from "./server.js";

const boostrap = async ()=> {
  await connectDatabase();
  startServer();
}

boostrap();

