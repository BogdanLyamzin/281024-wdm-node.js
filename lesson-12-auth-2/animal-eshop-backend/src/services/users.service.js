import User from "../db/User.js";

export const addAdmin = (payload) => User.create({ 
    ...payload, 
    role: "admin",
});
