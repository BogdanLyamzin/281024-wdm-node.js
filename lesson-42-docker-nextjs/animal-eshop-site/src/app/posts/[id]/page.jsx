import Image from "next/image";

import ToggleText from "@/shared/components/ToggleText/ToggleText";

import { fetchPostByIdApi } from "@/shared/api/posts-api";

const SinglePostPage = async ({ params }) => {
  const { id } = await params;

  const post = await fetchPostByIdApi(id);

  return (
    <main>
      <h1 className="text-center">{post.title}</h1>
      <Image
        src="/post-default.png"
        alt="Post default img"
        height={200}
        width={200}
      />
      <ToggleText>{post.body}</ToggleText>
    </main>
  );
};

export default SinglePostPage;
