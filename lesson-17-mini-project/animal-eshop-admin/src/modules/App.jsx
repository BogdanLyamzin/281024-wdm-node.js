import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "./Header/Header";
import Navigation from "../pages/Navigation";

import { getCurrent } from "../redux/auth/auth-thunks";

import { selectToken } from "../redux/auth/auth-selectors";

function App() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(()=> {
    if(token) {
      dispatch(getCurrent());
    }
  }, [dispatch]);
  
  return (
    <>
      <Header />
      <Navigation />
    </>
  );
}

export default App;
