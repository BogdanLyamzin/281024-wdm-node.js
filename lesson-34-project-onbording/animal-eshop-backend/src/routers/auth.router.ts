import { Router } from "express";

import {
  registerController,
  verifyController,
  loginController,
  getCurrentController,
  logoutController,
} from "../controllers/auth.controller";
import { authenticate } from "../middlewares/authorization";

const authRouter: Router = Router();

authRouter.post("/register", registerController);

authRouter.post("/verify", verifyController);

authRouter.post("/login", loginController);

authRouter.get("/current", authenticate, getCurrentController);

authRouter.post("/logout", authenticate, logoutController);

export default authRouter;
