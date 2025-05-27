import EventEmitter from "node:events";
import fs from "node:fs/promises";
import path from "node:path";

const emitter = new EventEmitter();

const logFilePath = path.resolve("src", "logs.txt");

emitter.on("info-log", async message => {
    await fs.appendFile(logFilePath, `\nInfo log: ${message}`);
})

emitter.on("error-log", async message => {
    await fs.appendFile(logFilePath, `\nError log: ${message}`);
})

export default emitter;