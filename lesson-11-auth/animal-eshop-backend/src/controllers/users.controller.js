import * as usersService from "../services/users.service.js";

export const addAdminController = async (req, res) => {
  const result = await usersService.addAdmin(req.body);

  res.status(201).json({
    message: `user with email ${result.email}`
  });
};
