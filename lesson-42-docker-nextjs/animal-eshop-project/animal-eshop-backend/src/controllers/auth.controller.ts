import { Request, Response } from "express";

import * as authService from "../services/auth.service";

import validateBody from "../utils/validateBody";

import { confirmGoogleOauthSchema, verifyCodeSchema, registerSchema, loginSchema } from "../validation/auth.schema";

import { generateOauth2Url } from "../utils/googleOauth2";

import { AuthenticatedRequest } from "../typescript/interfaces";
import { ILoginResponse } from "../services/auth.service";

export const getGoogleLoginLinkController = async(req: Request, res: Response): Promise<void>=> {
  const link = generateOauth2Url();

  res.json({
    link,
  });
}

export const confirmGoogleOauthController = async(req: Request, res: Response): Promise<void>=>{
  await validateBody(confirmGoogleOauthSchema, req.body);
  const result: ILoginResponse = await authService.loginOrRegisterWitGoogle(req.body);

  res.json(result);
}

export const registerController = async(req: Request, res: Response): Promise<void> => {
  await validateBody(registerSchema, req.body);
  await authService.register((req as AuthenticatedRequest).body);
  
  res.status(201).json({
    message: "User succeffully register. Please confirm email with link"
  })
};

export const verifyController = async(req: Request, res: Response)=> {
  await validateBody(verifyCodeSchema, req.body);
  await authService.verify(req.body.code);

  res.json({
    message: "User successfully verify"
  })
}

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
