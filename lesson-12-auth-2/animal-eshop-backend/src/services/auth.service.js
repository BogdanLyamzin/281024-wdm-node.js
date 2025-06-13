import User from "../db/User.js";

export const login = async ({email, password}) => {
    const user = await User.findOne({
        where: {
            email,
        }
    });
    console.log(user);
}