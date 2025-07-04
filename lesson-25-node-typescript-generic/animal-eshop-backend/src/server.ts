import express, {Express} from "express";
import cors from "cors";

import notFoundHandler from "./middlewares/notFoundHandler";
import errorHandler from "./middlewares/errorHandler";

import authRouter from "./routers/auth.router";
import usersRouter from "./routers/users.router";
import categoriesRouter from "./routers/categories.router";
import productsRouter from "./routers/products.router";
import orderRouter from "./routers/orders.router";

const startServer = (): void => {
    const app: Express = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.static("public"));

    app.use("/api/auth", authRouter);
    app.use("/api/users", usersRouter);
    app.use("/api/categories", categoriesRouter);
    app.use("/api/products", productsRouter);
    app.use("/api/orders", orderRouter);

    app.use(notFoundHandler);
    app.use(errorHandler);

    const port: number = Number(process.env.PORT) || 3000;

    app.listen(port, () => console.log(`Server running on ${port} port`));
}

export default startServer;