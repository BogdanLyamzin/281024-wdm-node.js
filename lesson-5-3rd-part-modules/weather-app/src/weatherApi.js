import axios from "axios";

const weatherInstance = axios.create({
    baseURL: "https://api.weatherstack.com",
    params: {
        access_key: process.env.WEATHER_ACCESS_KEY,
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