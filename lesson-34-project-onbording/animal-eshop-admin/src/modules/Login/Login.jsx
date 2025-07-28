import { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {useSearchParams} from "react-router-dom";

import Error from "../../shared/components/Error/Error";

import LoginForm from "./LoginForm/LoginForm";

import { selectAuth } from "../../redux/auth/auth-selectors";
import { login } from "../../redux/auth/auth-thunks";
import { verifyUserApi } from "../../shared/api/auth-api";

const Login = () => {
  const [searchParams, setSearcParams] = useSearchParams();
  const [successVerify, setSuccessVerify] = useState(false);
  const {loading, error} = useSelector(selectAuth);
  const dispatch = useDispatch();

  const verificationCode = searchParams.get("verificationCode");
  
  useEffect(()=> {
    if(verificationCode) {
      const fetchVerify = async()=> {
        try {
          await verifyUserApi(verificationCode);
          setSuccessVerify(true);
          setSearcParams();
        }
        catch(error) {
          console.log(error);
        }
      }
      fetchVerify();
    }
  }, [verificationCode]);

  const submitForm = (payload) => dispatch(login(payload));

  return (
    <Paper
      variant="outlined"
      sx={{
        width: "300px",
        padding: "15px",
        borderRadius: "10px",
      }}
    >
      {successVerify && <Typography variant="4">Email successfully verified</Typography>}
      <Typography variant="h5" textAlign="center" gutterBottom>
        Login to enter dashboard
      </Typography>
      <LoginForm submitForm={submitForm} loading={loading} />
      {error && <Error>{error}</Error>}
    </Paper>
  );
};

export default Login;
