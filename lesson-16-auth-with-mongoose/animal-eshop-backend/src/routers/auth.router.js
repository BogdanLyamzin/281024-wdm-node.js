import { Router } from "express";

import { loginController, getCurrentController, logoutController } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/authorization.js";

const authRouter = Router();

// signin
authRouter.post("/login", loginController);

authRouter.get("/current", authenticate, getCurrentController);

authRouter.post("/logout", authenticate, logoutController);

export default authRouter;