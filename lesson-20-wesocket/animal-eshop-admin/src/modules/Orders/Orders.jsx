import {useState, useEffect} from "react";
import io from "socket.io-client";

const Orders = ()=> {
    const [orders, setOrders] = useState([]);

    useEffect(()=> {
       const socket = io.connect("http://localhost:5000");
    }, []);

    const elements = orders.map(({_id, address, phone, userId, items})=> (
        <li key={_id}>
            <p>Addres: {address}</p>
            <p>Phone: {phone}</p>
            <p>User: {userId.fullName} {userId.email}</p>
            <ul>
                {items.map(({_id, product, count})=> (
                    <li key={_id}>
                        <p>Product name: {product.name}</p>
                        <p>Count: {count}</p>
                    </li>
                ))}
            </ul>
        </li>
    ));

    return <ol>{elements}</ol>
}

export default Orders;