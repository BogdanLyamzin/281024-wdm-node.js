import axios from "axios";

import { sortById } from "./utils";

interface ICategory {
  _id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const getMsFromISO = (iso: string) => new Date(iso).getTime();
// type Key = "_id" | "name" | "description" | "image" | "createdAt" | "updatedAt"
const sortByDate = <T>(arr: T[], key: keyof T): T[] => {
  return [...arr].sort(
    (a, b) =>
      getMsFromISO(a[key] as string) - getMsFromISO(b[key] as string)
  );
};

const categories = [
  {
    _id: "685bd0ff172fe34030e8b624",
    name: "Наполнители",
    description: "Лучшие наполнители для котов и собак",
    image: "categories\\1750847743716_197543905_category-img.jpg",
    createdAt: "2025-06-25T10:35:43.732Z",
    updatedAt: "2025-06-25T10:35:43.732Z",
  },
  {
    _id: "685bd0ff172fe34030e8b625",
    name: "Наполнители для котов",
    description: "Лучшие наполнители только для котов",
    image: "categories\\1750847743716_197543905_category-img.jpg",
    createdAt: "2025-05-25T10:35:43.732Z",
    updatedAt: "2025-05-25T10:35:43.732Z",
  },
];

// console.log(sortByDate(categories, "createdAt"));
// console.log(sortByDate<ICategory>(categories, "date"));
/*
const sortByCreatedAt = (categories: ICategory[]): ICategory[] => {
  return [...categories].sort(
    (a, b) =>
      getMSFromISO(a.createdAt) - getMSFromISO(b.createdAt)
  );
};
*/
interface IOrderItem {
  _id: string;
  product: string;
  count: number;
}

interface IOrder {
  _id: string;
  userId: string;
  address: string;
  phone: string;
  items: IOrderItem[];
  createdAt: string;
  updatedAt: string;
}

const orders = [{
  "_id": "685e526a52e02862b27e47d8",
  "userId": "68590c4cd5eaa2124408d7bd",
  "address": "Leipzig",
  "phone": "+49 234 555-55-55",
  "items": [
    {
      "product": "685d1bdc247e63cff9c59d7e",
      "count": 2,
      "_id": "685e526a52e02862b27e47d9"
    }
  ],
  "createdAt": "2025-06-27T08:12:26.950Z",
  "updatedAt": "2025-06-27T08:12:26.950Z"
},
{
  "_id": "685e6ae605e954e76148980f",
  "userId": "68590c4cd5eaa2124408d7bd",
  "address": "Berlin",
  "phone": "+49 777 777-77-77",
  "items": [
    {
      "product": "685d1bdc247e63cff9c59d7e",
      "count": 5,
      "_id": "685e6ae605e954e761489810"
    }
  ],
  "createdAt": "2025-06-27T09:56:54.548Z",
  "updatedAt": "2025-06-27T09:56:54.548Z"
}];

// console.log(sortByDate<IOrder>(orders, "updatedAt"));
/*
var categories = orders;
*/

const useState = <T>(state: T): [T, (newState: T)=> void]=> {
  const setState = (newState: T): void => {
    state = newState;
  }

  return [state, setState];
}

const [count, setCount] = useState<number>(1);
// const [user, setUser] = useState("Bohdan");

interface IPostImportant {
  id: number;
  title: string;
}

interface IPost extends IPostImportant {
  userId: number;
  body: string;
}

interface IResponse<T> {
  status: number;
  statusText: string;
  data: T[]
}

const fetchPosts = async(): Promise<IPost[]> => {
  const response: IResponse<IPost> = await axios.get("https://jsonplaceholder.typicode.com/posts");
  // const postId: number = data.map((item: IPost): number => item.id);
  const postsImportant: IPostImportant[] = response.data.map((item: IPost)=> ({id: item.id, title: item.title}));
  // return postsImportant;
  return response.data;
};

const getSortPosts = async ()=> {
  const data = await fetchPosts();
  const sortedPosts = sortById<IPost>(data);
}

getSortPosts();