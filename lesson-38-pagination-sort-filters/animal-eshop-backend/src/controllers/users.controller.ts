import { Request, Response } from 'express';

import * as usersService from "../services/users.service";

import validateBody from "../utils/validateBody";

import { adminAddSchema, adminChangePasswordSchema } from "../validation/users.schema";

import HttpExeption from "../utils/HttpExeption";

import { UserDocument } from '../db/User';

export const addAdminController = async (req: Request, res: Response): Promise<void> => {
  await validateBody(adminAddSchema, req.body);
  const result: UserDocument = await usersService.addAdmin(req.body);

  res.status(201).json({
    message: `user with email ${result.email}`,
  });
};

export const changeAdminPasswordController = async(req: Request, res: Response): Promise<void> => {
  await validateBody(adminChangePasswordSchema, req.body);
  const id = req.params.id as string;
  const result: UserDocument | null = await usersService.changeAdminPassword(id, req.body);
  if(!result) throw HttpExeption(404, `Admin with id=${id} not found`);

  res.json({
    message: "Password change successfully"
  });
}
