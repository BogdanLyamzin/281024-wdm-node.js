// import {readFile, readFileSync} from "node:fs";
import * as fs from "node:fs/promises";
// import { readFile } from "node:fs/promises";
import path from "node:path";

const isFolder = async folderPath => {
    try {
        await fs.access(folderPath);
        await fs.readFile(folderPath);
        // console.log(`${folderPath} is file`);
        return false;
    }
    catch(error) {
        if(error.code === "ENOENT") {
            throw error;
        }
        // console.log(`${folderPath} is folder`);
        return true;
    }
}
// console.log(await isFolder("src/data"));
// console.log(await isFolder("src/filename"));
// console.log(await isFolder("src/file"));
// const filepath = path.resolve("src", "logs.txt");

// readFile(filepath, "utf-8", (error, data)=> {
//     if(!error) {
//         console.log("Text from file:", data);
//     }
// })

// const data = readFileSync(filepath, "utf-8");
// console.log(data);
// const data = await readFile(filepath, "utf-8");
// console.log(data);

// console.log("After start read file");

const dataPath = path.resolve("src", "data");

// try {
//     // const response = await fs.access(dataPath);
//     await fs.mkdir(dataPath);
    
//     console.log("data folder create successfully");
// }
// catch(error) {
//     console.log(error.message);
// }

// try {
        // await fs.access(dataPath);
//     const response = await fs.rmdir(dataPath);
//     console.log(response);
//     console.log("Folder remove successfully");
// }
// catch(error) {
//     console.log(error.message);
// }

// try {
//     await fs.unlink("src/test-file.txt");
//     console.log("Remove file successfully")
// }
// catch(error) {
//     console.log(error.message);
// }

// try {
//     const response = await fs.readdir(dataPath);
//     // console.log(response);
//     response.forEach(async file => {
//         // const basename = path.basename(file);
//         // const extension = path.extname(file);
//         // const [extension] = path.split(".").reverse(".");
//         const filepath = path.join(dataPath, file);
//         if(!(await isFolder(filepath))) {
//             const fileData = await fs.readFile(filepath, "utf-8");
//             console.log(fileData);
//         }
//         else {
//             console.log(`${file} is folder`);
//         }
//     });
// }
// catch(error) {
//     console.log(error.message);
// }

// try {
//     const oldFileName = path.resolve("src", "filename.txt");
//     const newFileName = path.resolve("src", "data", "filename.txt");
//     await fs.rename(oldFileName, newFileName);
// }
// catch(error) {
//     console.log(error.message);
// }

try {
    const oldFileName = path.resolve("src", "data", "filename.txt");
    const newFileName = path.resolve("src", "filename.txt");
    await fs.copyFile(oldFileName, newFileName);
}
catch(error) {
    console.log(error.message);
}