import axios from "axios";

const authInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/auth`
});

export const loginUserApi = async payload => {
    const {data} = await authInstance.post("/login", payload);
    return data;
}