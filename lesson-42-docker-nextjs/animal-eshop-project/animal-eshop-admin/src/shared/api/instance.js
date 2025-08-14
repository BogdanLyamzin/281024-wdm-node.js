import axios from "axios";
console.log(import.meta.env)
const backendInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export default backendInstance;