import * as authService from "../services/auth.service.js";

import validateBody from "../utils/validateBody.js";

import { loginSchema } from "../validation/auth.schema.js";

export const loginController = async(req, res)=> {
    await validateBody(loginSchema, req.body);
    const result = await authService.login(req.body);

    res.json(result);
}

export const logoutController = async(req, res)=> {
    await authService.logout(req.user);

    res.json({
        message: "Logout successfully"
    })
}