import {createServer} from "node:http";

import emitter from "./logger.js";

const server = createServer((req, res)=> {
    switch(req.url) {
        case "/":
            emitter.emit("info-log", `Request ${req.method} ${req.url} 200`);
            res.setHeader("Content-type", "application/json");
            return res.end(JSON.stringify({message: "Home page"}));

        case "/products":
            emitter.emit("info-log", `Request ${req.method} ${req.url} 200`);
            res.setHeader("Content-type", "application/json");
            return res.end(JSON.stringify({message: "Products page"}));

        default:
            emitter.emit("error-log", `Request ${req.method} ${req.url} 404`);
            res.setHeader("Content-type", "application/json");
            res.statusCode = 404;
            return res.end(JSON.stringify({message: "Not found"}));
    }
});

server.listen(3000, ()=> emitter.emit("info-log", "Server running on 3000 port"));