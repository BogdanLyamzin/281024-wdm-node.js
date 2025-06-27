import "dotenv/config";

import connectDatabase from "./db/connectDatabase.js";
import startServer from "./server.js";
import startWebsocketServer from "./wsServer.js";

const bootstrap = async () => {
  await connectDatabase();
  startServer();
  startWebsocketServer();
};

bootstrap();
