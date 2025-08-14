import Link from "next/link";

import { fetchAllPostsApi } from "@/shared/api/posts-api";

const PostsPage = async ()=> {
    const posts = await fetchAllPostsApi();
    const elements = posts.map(({id, title})=> <li key={id}>
        <Link href={`/posts/${id}`}>{title}</Link>
    </li>);

    return <ul>{elements}</ul>
}

export default PostsPage;