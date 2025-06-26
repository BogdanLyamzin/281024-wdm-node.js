import axios from "axios";

const backendInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export default backendInstance;