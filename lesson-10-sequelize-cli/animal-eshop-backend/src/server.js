import express from "express";
import cors from "cors";

import notFoundHandler from "./middlewares/notFoundHandler.js";

const startServer = ()=> {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use(notFoundHandler);

    const port = process.env.PORT || 3000;

    app.listen(port, ()=> console.log(`Server running on ${port} port`));
}

export default startServer;