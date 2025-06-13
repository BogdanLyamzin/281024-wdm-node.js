import { Router } from "express";

import { addAdminController, changeAdminPasswordController } from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.post("/admins", addAdminController);

usersRouter.put("/admins/:id/password", changeAdminPasswordController);

export default usersRouter;