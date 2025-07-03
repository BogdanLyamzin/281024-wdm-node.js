import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../db/User.js";

import HttpExeption from "../utils/HttpExeption.js";

const { JWT_SECRET } = process.env;

const createToken = user => {
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  return token;
}

export const login = async ({ email, password }) => {
  const user = await User.findOne({email});

  if (!user) throw HttpExeption(401, `User with email=${email} not found`); // throw HttpExeption(401, "Email or password invalid");

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpExeption(401, `Password invalid`);

  const token = createToken(user);
  user.token = token;
  await user.save();

  return {
    token,
    user: {
      email: user.email,
      fullName: user.fullName,
    },
  };
};

export const getCurrent = async user => {
  const token = createToken(user);
  user.token = token;
  await user.save();

  return {
    token,
    user: {
      email: user.email,
      fullName: user.fullName,
    },
  };
}

export const logout = async ({_id})=> {
  const user = await User.findById(_id);
  if (!user) throw HttpExeption(401, `User not found`);
  user.token = "";
  await user.save();
}
