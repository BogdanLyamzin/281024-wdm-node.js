import { Request, Response } from "express";

import * as authService from "../services/auth.service";

import validateBody from "../utils/validateBody";

import { loginSchema } from "../validation/auth.schema";

import { AuthenticatedRequest } from "../typescript/interfaces";
import { ILoginResponse } from "../services/auth.service";

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  await validateBody(loginSchema, req.body);
  const result: ILoginResponse = await authService.login(
    (req as AuthenticatedRequest).body
  );

  res.json(result);
};

export const getCurrentController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result: ILoginResponse = await authService.getCurrent(
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
