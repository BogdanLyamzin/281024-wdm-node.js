import jwt from "jsonwebtoken";

import User from "../db/User.js";

import HttpExeption from "../utils/HttpExeption.js";

const { JWT_SECRET } = process.env;

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  // const authorization = req.get("authorization");
  if (!authorization) throw HttpExeption(401, "Authorization header missing");

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") throw HttpExeption(401, "Bearer missing");

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(id);
    if (!user) {
      return next(HttpExeption(401, "User not found"));
    }
    req.user = user;
    next();
  } catch (error) {
    throw HttpExeption(401, error.message);
  }
};

export const isSuperadmin = (req, res, next) => {
  if (req.user.role !== "superadmin") throw HttpExeption(403, "Not allow");
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "superadmin" && req.user.role !== "admin")
    throw HttpExeption(403, "Not allow");
  next();
};

export const isManager = (req, res, next)=> {
    if(req.user.role === "user") throw HttpExeption(403, "Not allow");
    next();
}
