import backendInstance from "./instance";

export const addCategoryApi = async payload => {
    const {data} = await backendInstance.post("/categories", payload, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return data;
}