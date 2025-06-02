import axios from "axios";

const weatherInstance = axios.create({
    baseURL: "https://api.weatherstack.com",
    params: {
        access_key: "ee10c6c95a86c75dcd3d7109143493a4",
    }
});

export const getCurrentWeatherByCity = async city => {
    const {data} = await weatherInstance.get("/current", {
        params: {
            query: city
        }
    });

    return data;
}