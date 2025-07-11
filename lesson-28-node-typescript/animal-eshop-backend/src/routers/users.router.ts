import { Router } from "express";

import { addAdminController, changeAdminPasswordController } from "../controllers/users.controller";

import { authenticate, isSuperadmin } from "../middlewares/authorization";

const usersRouter: Router = Router();

usersRouter.post("/admins", authenticate, isSuperadmin, addAdminController);

usersRouter.put("/admins/:id/password", authenticate, isSuperadmin, changeAdminPasswordController);

export default usersRouter;