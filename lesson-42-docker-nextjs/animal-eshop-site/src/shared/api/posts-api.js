import axios from "axios";

const postsInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/posts"
})

export const fetchAllPostsApi = async()=> {
    const {data} = await postsInstance.get("/");
    return data;
}

export const fetchPostByIdApi = async id => {
    const {data} = await postsInstance.get(`/${id}`);
    return data;
}