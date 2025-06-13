import { Router } from "express";

import { addAdminController, changeAdminPasswordController } from "../controllers/users.controller.js";

import { authenticate, isSuperadmin } from "../middlewares/authorization.js";

const usersRouter = Router();

usersRouter.post("/admins", authenticate, isSuperadmin, addAdminController);

usersRouter.put("/admins/:id/password", authenticate, isSuperadmin, changeAdminPasswordController);

export default usersRouter;