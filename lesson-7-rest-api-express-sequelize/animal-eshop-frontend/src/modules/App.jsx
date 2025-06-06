import { useEffect } from 'react';
import axios from "axios";


function App() {
  useEffect(()=> {
    axios.get("http://localhost:3000/api/products")
      .then(({data})=> console.log(data))
      .catch(error => console.log(error));

  }, []);

  return (
    <>
     
    </>
  )
}

export default App
