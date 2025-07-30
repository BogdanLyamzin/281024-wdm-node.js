import backendInstance from "./instance";

export const getOrdersApi = async()=> {
    const {data} = await backendInstance.get("/orders");
    return data;
}