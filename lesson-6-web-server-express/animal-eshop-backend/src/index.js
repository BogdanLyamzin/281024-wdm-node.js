import express from "express";
import cors from "cors";

import products from "./db/products.js";

const app = express(); // app - web-server

app.use(cors());
// const corsMiddleware = cors();
// app.use(corsMiddleware);

// app.set("json spaces", 4);

/*
const cors = options => {
    return (req, res, next)=> {
        // add options
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
        res.setHeader("Access-Control-Allow-Credentials", true);
        next();
    }
}
*/

/*
 request - объект, содержащий всю информацию про запрос:
    - url - вторая часть адреса запроса (после адреса сайта, на котором запущен бекенд);
    - method - метод запроса;
    - тело запрос (body);
    - заголовки (Headers);
    - параметры маршрута (:id - params);
    - параметры поиска (?minPrice=200 - query);
    - куки (cookies);
 response - объект, который позволяет настроить и отправить ответ:
    - status(404) - установить статус;
    - setHeader("Content-Type", "application/json");
    - send(), json(), render(), sendFile() - отправка ответа
*/

// app.use((req, res, next)=> {
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    // res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    // res.setHeader("Access-Control-Allow-Credentials", true);
    // next();
// })

// app.use((req, res, next)=> {
//     console.log("First middleware");
//     next();
// })

// app.use((req, res, next)=> {
//     console.log("Second middleware");
//     next();
// })

app.get("/", async (request, response)=> {
    console.log(request.method);
    console.log(request.url);
    response.send("<h1>Animal shop home page</h1>");
    console.log("После отправки ответа на фронтенд");
})

app.get("/api/products", (req, res)=> {
    // const {user} = req.headers; // заголовок запроса
    const user = req.get("user"); // заголовок запроса
    console.log("user", user);
    // const databaseResponse = null;
    // res.json(databaseResponse);
    // res.send(databaseResponse);
    // res.setHeader("Content-Type", "text/plain"); // устанавливаем заголовок "Content-Type" в значении "text/plain" для ответа
    res.json(products);
    // res.send(products);
});

app.put("/api/products", (req, res)=> {
    res.json({
        message: "PUT request"
    })
})

app.listen(3000, ()=> console.log("Server running on 3000 port"));