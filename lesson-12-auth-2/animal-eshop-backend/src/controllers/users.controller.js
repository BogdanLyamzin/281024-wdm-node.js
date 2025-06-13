import * as usersService from "../services/users.service.js";

import validateBody from "../utils/validateBody.js";

import { adminAddSchema, adminChangePasswordSchema } from "../validation/users.schema.js";

export const addAdminController = async (req, res) => {
  await validateBody(adminAddSchema, req.body);
  const result = await usersService.addAdmin(req.body);

  res.status(201).json({
    message: `user with email ${result.email}`,
  });
};

export const changeAdminPasswordController = async(req, res)=> {
  await validateBody(adminChangePasswordSchema, req.body);
  const {id} = req.params;
  await usersService.changeAdminPassword(id, req.body);
}
