import jwt from "jsonwebtoken";

const payload = {
    id: 9
};

const JWT_SECRET = "flcxUgTAE9ga4i8wpdv51l1d0qWUq023";

const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "24h"});
// console.log(token);
const decodeToken = jwt.decode(token);
// console.log(decodeToken);

try {
    const {id} = jwt.verify(token, JWT_SECRET);
    console.log(id);
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJvZ2RhbkBnbWFpbC5jb20iLCJpYXQiOjE3NDk4MTE3NDksImV4cCI6MTc0OTg5ODE0OX0.xuE3njAEjDc4KT97UPdBQJvHP_Bj2b540byEB9Sjjhq";
    jwt.verify(invalidToken, JWT_SECRET);
}
catch(error) {
    console.log(error.message);
}