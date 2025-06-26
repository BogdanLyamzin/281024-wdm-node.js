import * as Yup from "yup";

export const emailValidation = {
  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  message: "email mast contain @, dot and no contain spaces",
};

export const passwordValidation = {
  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]+$/,
  message:
    "Password must contains al least 1 letter, 1 number and 1 special symbol",
};

export const passwordSchema = Yup.string()
  .trim()
  .min(6)
  .matches(passwordValidation.value, passwordValidation.message)
  .required();

export const emailSchema = Yup.string()
  .trim()
  .matches(emailValidation.value, emailValidation.message)
  .required();
