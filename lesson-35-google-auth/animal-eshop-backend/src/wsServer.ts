import { Server as WsServer, Socket } from "socket.io";
import { createServer, Server } from "node:http";

import Order from "./db/Order";

const startWebsocketServer = (): void => {
    const httpServer: Server = createServer();

    const wsServer = new WsServer(httpServer, {
      cors: {
        origin: "*",
      },
    });

    wsServer.on("connection", (socket: Socket): void => {
      console.log("New frontend connected");
      socket.on("disconnect", (): void => {
          console.log("User disconnected")
      })
    });
    // типизировать data когда типизируем Order
    Order.watch().on("change", data => {
        wsServer.emit("orderUpdated", data);
    });

    const wsPort: number = Number(process.env.SOCKET_PORT) || 5000;
    
    httpServer.listen(wsPort, () =>
      console.log(`Websocket run on ${wsPort}`)
    );
}

export default startWebsocketServer;

