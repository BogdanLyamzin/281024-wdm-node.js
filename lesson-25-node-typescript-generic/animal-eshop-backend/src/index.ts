import "dotenv/config";

import connectDatabase from "./db/connectDatabase";
import startServer from "./server";
import startWebsocketServer from "./wsServer";

const bootstrap = async () => {
  await connectDatabase();
  startServer();
  startWebsocketServer();
};

bootstrap();
