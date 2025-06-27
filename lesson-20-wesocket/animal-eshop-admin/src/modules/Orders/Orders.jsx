import {useState, useEffect} from "react";
import io from "socket.io-client";

import { getOrdersApi } from "../../shared/api/orders-api";


const Orders = ()=> {
    const [orders, setOrders] = useState([]);

    useEffect(()=> {
        const fetchOrders = async()=> {
            try {
                const data = await getOrdersApi();
                setOrders(data);
            }
            catch(error){
                console.log(error.response?.data?.message);
            }
        }
        fetchOrders();
    }, []);

    useEffect(()=> {
       const socket = io.connect("http://localhost:5000");
       socket.on("orderUpdated", data=> {
        const {operationType, fullDocument} = data;
        if(operationType === "insert") {
            setOrders(prevOrders => [...prevOrders, fullDocument]);
        }
       });
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