import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const {VITE_STRIPE_PUBLISH_KEY, VITE_API_URL} = import.meta.env;

const backendInstanse = axios.create({
    baseURL: VITE_API_URL
})

const Donate = ()=> {
// "cs_test_a1IcwFTJEnxTwiGcsTc6REf6HgghVGdMZmmHtTSLuc4ZqxLaopaUmUbKvM
    const handleDonate = async()=> {
        try {
            const stripe = await loadStripe(VITE_STRIPE_PUBLISH_KEY);
            const {data: paymentSession} = await backendInstanse.post("/payment/payment-session", {
                name: "Donate",
                price: 5,
            });
            console.log(paymentSession)
            const result = await stripe.redirectToCheckout({
                sessionId: paymentSession.id
            });
            // console.log(result);
        }
        catch(error) {
            console.log(error);
        }
    }

    return <button onClick={handleDonate}>Donate for education</button>
}

export default Donate;