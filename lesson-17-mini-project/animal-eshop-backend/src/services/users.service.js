import bcrypt from "bcrypt";

import User from "../db/User.js";

import HttpExeption from "../utils/HttpExeption.js";

export const addAdmin = async (payload) => {
    const hashPassword = await bcrypt.hash(payload.password, 10);
    return User.create({ 
        ...payload, 
        password: hashPassword,
        role: "admin",
    });
};

export const changeAdminPassword = async (id, {oldPassword, newPassword}) => {
    const admin = await User.findById(id);
    if(!admin) return null;

    const passwordCompare = await bcrypt.compare(oldPassword, admin.password);
    if(!passwordCompare) throw HttpExeption(400, "Old password invalid");

    const hashPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashPassword;
    await admin.save();

    return admin;
}
