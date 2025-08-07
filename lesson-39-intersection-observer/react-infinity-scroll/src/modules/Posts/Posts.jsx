import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

import styles from "./Posts.module.css";

const _limit = 20;

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const loadMoreRef = useRef(null);
  const isObserveRef = useRef(false);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _limit,
            _page: page,
          },
        }
      );
      setPosts((prevPosts) => [...prevPosts, ...data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setError(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchPosts();
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "150px",
      }
    );

    if (loadMoreRef.current && posts.length > 0 && !isObserveRef.current) {
      observer.observe(loadMoreRef.current);
      isObserveRef.current = true;
    }
  }, [loadMoreRef, fetchPosts, posts]);

  const elements = posts.map(({ id, title, body }) => (
    <li key={id} className={styles.post}>
      <h5>{title}</h5>
      <p>{body}</p>
    </li>
  ));

  return (
    <>
      <ul className={styles.list}>{elements}</ul>
      <div ref={loadMoreRef}></div>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
};

export default Posts;
