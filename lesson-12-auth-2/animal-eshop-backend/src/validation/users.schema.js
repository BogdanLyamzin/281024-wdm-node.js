import * as Yup from "yup";

import { emailValidation } from "../constants/users.constants.js";

export const adminAddSchema = Yup.object({
  email: Yup.string().trim().matches(emailValidation.value, emailValidation.message).required(),
  password: Yup.string()
    .trim()
    .min(6)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]+$/,
      "Password must contains al least 1 letter, 1 number and 1 special symbol"
    )
    .required(),
});
