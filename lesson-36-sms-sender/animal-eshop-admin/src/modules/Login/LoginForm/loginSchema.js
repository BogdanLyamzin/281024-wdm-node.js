import * as Yup from "yup";

import { passwordSchema, emailSchema } from "../../../shared/utils/validation";

const loginSchema = Yup.object({
    email: emailSchema,
    password: passwordSchema,
});

export default loginSchema;