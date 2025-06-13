import { Router } from "express";

import { addAdminController, changeAdminPasswordController } from "../controllers/users.controller.js";

import { authenticate } from "../middlewares/authorization.js";

const usersRouter = Router();

usersRouter.post("/admins", authenticate, addAdminController);

usersRouter.put("/admins/:id/password", authenticate, changeAdminPasswordController);

export default usersRouter;