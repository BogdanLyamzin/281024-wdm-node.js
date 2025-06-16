import * as authService from "../services/auth.service.js";

import validateBody from "../utils/validateBody.js";

import { loginSchema } from "../validation/auth.schema.js";

export const loginController = async(req, res)=> {
    await validateBody(loginSchema, req.body);
    const token = await authService.login(req.body);

    res.json({token});
}