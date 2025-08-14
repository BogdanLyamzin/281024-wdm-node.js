import backendInstance from "./instance";

export const getCategoriesApi = async()=> {
    const {data} = await backendInstance.get("/categories");
    return data;
}

export const addCategoryApi = async payload => {
    const {data} = await backendInstance.post("/categories", payload, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return data;
}