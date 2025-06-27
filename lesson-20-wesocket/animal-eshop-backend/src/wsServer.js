import { Server } from "socket.io";
import { createServer } from "node:http";

const startWebsocketServer = ()=> {
    const httpServer = createServer();

    const wsServer = new Server(httpServer, {
      cors: {
        origin: "*",
      },
    });

    wsServer.on("connection", ()=> {
        console.log("New frontend connected");
    });
    
    httpServer.listen(process.env.SOCKET_PORT, () =>
      console.log(`Websocket run on ${process.env.SOCKET_PORT}`)
    );
}

export default startWebsocketServer;

