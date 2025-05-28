import * as fs from "node:fs";

// const readStream = fs.createReadStream("src/logs.txt", "utf-8");
// // console.log(readStream); // читает файл по кусочкам. Кусочек называется chunk
// readStream.on("end", ()=> {
//     console.log("Закончили читать логи проекта");
// })

// readStream.on("data", chunk => {
//     console.log(chunk);
// })

// const writeStream = fs.createWriteStream("src/new-logs.txt");
// writeStream.write("First new log\n");
// writeStream.write("Second new log\n");
// writeStream.write("Third new log\n");

// writeStream.on("finish", ()=> {
//     console.log("New logs writed successfully");
// });

const writeStream = fs.createWriteStream("src/logs-copy.txt");
const readStream = fs.createReadStream("src/logs.txt", "utf-8");

// readStream.on("data", chunk => {
//     writeStream.write(`${chunk}\n`);
// })

readStream.pipe(writeStream);
