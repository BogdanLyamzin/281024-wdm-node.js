import { Router } from "express";

import {
  getGoogleLoginLinkController,
  confirmGoogleOauthController,
  registerController,
  verifyController,
  loginController,
  getCurrentController,
  logoutController,
} from "../controllers/auth.controller";
import { authenticate } from "../middlewares/authorization";

const authRouter: Router = Router();

authRouter.get("/google-login-link", getGoogleLoginLinkController);

authRouter.post("/confirm-google-oauth", confirmGoogleOauthController);

authRouter.post("/register", registerController);

// authRouter.post("/resend-verify-email", )

authRouter.post("/verify", verifyController);

authRouter.post("/login", loginController);

authRouter.get("/current", authenticate, getCurrentController);

authRouter.post("/logout", authenticate, logoutController);

export default authRouter;
