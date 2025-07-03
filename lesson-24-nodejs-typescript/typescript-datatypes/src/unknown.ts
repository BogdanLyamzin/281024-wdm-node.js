const userName: any = "Bohdan";
userName.split(' ');

const userAge: unknown = 39;
if(typeof userAge === "string") {
    userAge.split(" ");
}

interface IBook {
    title: string;
    author: string;
    description: string;
    releaseYear: number;
}

const sortBooksByReleaseYear = (books: unknown)=> {
    if(books instanceof Array) {
        return [...books].sort((a:IBook, b: IBook): number => a.releaseYear - b.releaseYear);
    }
    throw new Error("books must be array");
}

const books = [
    {
        title: "Messia of Dune",
        author: "Gerbert Frank",
        description: "All you need is space",
        releaseYear: 1972
    },
    {
        title: "Dune",
        author: "Gerbert Frank",
        description: "All you need is space",
        releaseYear: 1965
    }
];
// console.log(typeof []);
// console.log(typeof {});
// console.log(Array.isArray({}));
// console.log(Array.isArray(books));
// console.log({} instanceof Array);
// console.log(books instanceof Array);

// console.log(sortBooksByReleaseYear(books));
// console.log(sortBooksByReleaseYear(""));

// type LocalStorageData = string | null;

// const data: LocalStorageData = localStorage.getItem("books")
// if(typeof data === "string") {
//     const myBooks = JSON.parse(data);
// }

try {
    const myBooks = JSON.parse("{");
}
catch(error) {
    if(error instanceof Error) {
        console.log(error.message);
    }
}
