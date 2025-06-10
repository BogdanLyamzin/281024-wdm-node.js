import "dotenv/config";

import { connectDatabase } from "./db/sequelize.js";
import startServer from "./server.js";
import createAssociates from "./db/associates.js";

const boostrap = async ()=> {
  await connectDatabase();
  createAssociates();
  startServer();
}

boostrap();

