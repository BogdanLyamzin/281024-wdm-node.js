import axios, { AxiosError } from "axios";

const getPromise = (delay = 2000) =>
  new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      const response = Math.random();
      if (response > 0.5) {
        resolve(`Fullfiled: ${response} > 0.5`);
      } else {
        reject(new Error(`rejected: ${response} < 0.5`));
      }
    }, delay);
  });

// const promise1 = getPromise();
// promise1
//     .then(result => console.log(result))
//     .catch(error => console.log(error.message));

const getSomePromisesResult = async () => {
  try {
    const result1 = await getPromise();
    console.log(result1);
    const result2 = await getPromise();
    console.log(result2);
    const result3 = await getPromise();
    console.log(result3);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

// getSomePromisesResult();

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

const getFirstPost = async (): Promise<void> => {
  try {
    const { data: posts } = await instance.get<IPost[]>("/posts");
    const { id } = posts[0];
    const { data: firstPost } = await instance.get<IPost>(`/posts/${id}`);
    console.log(firstPost);
  } catch (error) {
    console.log((error as AxiosError).response?.data);
  }
};

// getFirstPost();

const getAllPosts = async () => {
  const { data } = await instance.get("/posts");
  return data;
};

const getAllUsers = async () => {
  const { data } = await instance.get("/user");
  return data;
};

const getPostsAndUsers = async () => {
  try {
    const results = await Promise.all([getAllPosts(), getAllUsers()]);
    console.log(results);
  } catch (error) {
    console.log((error as AxiosError).response?.data);
  }
};

// getPostsAndUsers();

const runParallePromises = async () => {
  try {
    const results = await Promise.all([getPromise(1000), getPromise(5000)]);
    console.log(results);
  } catch (error) {
    console.log((error as Error).message);
  }
};

// runParallePromises();

const getPostsAndUsersWithError = async () => {
  // @ts-expect-error
  const results = await Promise.allSettled([getAllPosts(), getAllUsers()]);
  results.forEach(({ status, value, reason }) => {
    if (status === "fullfiled") {
      console.log(value);
    } else {
      console.log(reason);
    }
  });
};

getPostsAndUsersWithError();
