// import fs from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import detect from "detect-file-encoding-and-language";

const fileOperations = async ()=> {
    // const filepath = "./src/data/my-notes.txt";
    // const filepath = path.join(process.cwd(), "src", "data", "my-notes.txt");
    const filepath = path.resolve("src", "data", "my-notes.txt")
    // const buffer = await fs.readFile(filepath);
    // const text = buffer.toString();
    // console.log(text);
    const text = await fs.readFile(filepath, "utf-8");
    console.log(text);
    // const {encoding} = await detect(filepath);
    // const text = await fs.readFile(filepath, encoding);
    // console.log(text);
    // await fs.appendFile(filepath, "\nПокормить кота");
    // await fs.writeFile(filepath, "Пофиксить баги");
    // await fs.appendFile("./src/data/my-notes2.txt", "\nПокормить кота");
    // await fs.writeFile("./src/data/my-notes3.txt", "Пофиксить баги");
    // await fs.unlink("./src/data/my-notes3.txt");
}

export default fileOperations;

// const data = await fs.readFile("./src/data/my-notes.txt");
// console.log(data.toString());

// fs.readFile("./src/data/my-notes.txt")
//     .then(data => console.log(data.toString()))
//     .catch(error => console.log(error.message));

// fs.readFile("./src/data/my-notes.txt", (error, data) => {
//     // console.log(error);
//     // console.log(data.toString());
//     fs.writeFile("./src/data/my-notes-copy.txt", data.toString(), ()=> {})
// })