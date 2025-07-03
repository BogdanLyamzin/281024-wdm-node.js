import multer from "multer";
import * as path from "node:path";

import HttpExeption from "../utils/HttpExeption.js";

const storage = multer.diskStorage({
    destination: path.resolve("temp"),
    filename: (req, file, callback)=> {
        const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
        const filename = `${uniquePrefix}_${file.originalname}`;
        callback(null, filename);
    }
});

const limits = {
    fileSize: 1024 * 1024 * 10
};

const fileFilter = (req, file, callback)=> {
    const extension = file.originalname.split(".").pop();
    if(extension === "exe") {
        return callback(HttpExeption(400, ".exe file not allow"));
    }
    callback(null, true);
}

const upload = multer({
    storage,
    limits,
    fileFilter,
});

export default upload;