import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../db/User.js";

import HttpExeption from "../utils/HttpExeption.js";

const {JWT_SECRET} = process.env;

export const login = async ({ email, password }) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) throw HttpExeption(401, `User with email=${email} not found`); // throw HttpExeption(401, "Email or password invalid");

   const passwordCompare = await bcrypt.compare(password, user.password);
   if(!passwordCompare) throw HttpExeption(401, `Password invalid`); 

   const payload = {
    id: user.id,
   };

   const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "24h"});
   return token;
};
