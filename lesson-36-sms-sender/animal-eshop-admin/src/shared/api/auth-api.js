import backendInstance from "./instance";

export const getGoogleLoginLinkApi = async () => {
    const {data} = await backendInstance.get("/auth/google-login-link");
    return data;
}

export const confirmGoogleOauthApi = async code => {
    const {data} = await backendInstance.post("/auth/confirm-google-oauth", {code});
    return data;
}

export const verifyUserApi = async code => {
    const {data} = await backendInstance.post("/auth/verify", {code});
    return data;
}

export const loginUserApi = async payload => {
    const {data} = await backendInstance.post("/auth/login", payload);
    return data;
}

export const finishLoginUserApi = async payload => {
    const {data} = await backendInstance.post("/auth/finish-login", payload);
    backendInstance.defaults.headers["Authorization"] = `Bearer ${data.token}`;
    return data;
}

export const getCurrentUserApi = async token => {
    backendInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
    try {
        const {data} = await backendInstance.get("/auth/current");
        backendInstance.defaults.headers["Authorization"] = `Bearer ${data.token}`;
        return data;
    }
    catch(error) {
        delete backendInstance.defaults.headers["Authorization"];
        throw error;
    }
}

export const logoutUserApi = async()=> {
    const {data} = await backendInstance.post("/auth/logout");
    delete backendInstance.defaults.headers["Authorization"];
    return data;
}

