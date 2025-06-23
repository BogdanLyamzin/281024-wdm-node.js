import axios from "axios";

const authInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/auth`
});

export const loginUserApi = async payload => {
    const {data} = await authInstance.post("/login", payload);
    authInstance.defaults.headers["Authorization"] = `Bearer ${data.token}`;
    return data;
}

export const getCurrentUserApi = async token => {
    authInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
    try {
        const {data} = await authInstance.get("/current");
        authInstance.defaults.headers["Authorization"] = `Bearer ${data.token}`;
        return data;
    }
    catch(error) {
        delete authInstance.defaults.headers["Authorization"];
        throw error;
    }
}

export const logoutUserApi = async()=> {
    const {data} = await authInstance.post("/logout");
    delete authInstance.defaults.headers["Authorization"];
    return data;
}