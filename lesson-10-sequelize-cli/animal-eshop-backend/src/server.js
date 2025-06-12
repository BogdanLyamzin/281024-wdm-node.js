import express from "express";
import cors from "cors";

const startServer = ()=> {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.listen(3000, ()=> console.log("Server running on 3000 port"));
}

export default startServer;