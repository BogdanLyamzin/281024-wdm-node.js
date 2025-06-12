import { Router } from "express";

import { addAdminController } from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.post("/admins", addAdminController);

export default usersRouter;