import bcrypt from "bcrypt";

import User from "../db/User.js";

export const addAdmin = async (payload) => {
    const hashPassword = await bcrypt.hash(payload.password, 10);
    return User.create({ 
        ...payload, 
        password: hashPassword,
        role: "admin",
    });
};

export const changeAdminPassword = async (id, {oldPassword, newPassword}) => {
    const user = await User.findByPk(id);
    if(!user) return null;

    const passwordCompare = await bcrypt.compare(oldPassword, user.password);
    if(!passwordCompare) {
        const error = new Error("Old password not match");
        error.status = 400;
        throw error;
    }
}
