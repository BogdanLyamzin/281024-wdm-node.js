import { Request, Response } from "express";

import * as authService from "../services/auth.service";

import validateBody from "../utils/validateBody.js";

import { loginSchema } from "../validation/auth.schema.js";

import { AuthenticatedRequest } from "../interfaces";

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  await validateBody(loginSchema, req.body);
  const result = await authService.login(req.body);

  res.json(result);
};

export const getCurrentController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = await authService.getCurrent(
    (req as AuthenticatedRequest).user
  );

  res.json(result);
};

export const logoutController = async (
  req: Request,
  res: Response
): Promise<void> => {
  await authService.logout((req as AuthenticatedRequest).user);

  res.json({
    message: "Logout successfully",
  });
};
