import { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useSearchParams} from "react-router-dom";

import Error from "../../shared/components/Error/Error";

import LoginForm from "./LoginForm/LoginForm";

import { selectAuth } from "../../redux/auth/auth-selectors";
import { login, loginWithGoogle } from "../../redux/auth/auth-thunks";
import { verifyUserApi, getGoogleLoginLinkApi, confirmGoogleOauthApi } from "../../shared/api/auth-api";

const Login = () => {
  const [searchParams, setSearcParams] = useSearchParams();
  const [successVerify, setSuccessVerify] = useState(false);
  const {loading, error} = useSelector(selectAuth);
  const dispatch = useDispatch();

  const verificationCode = searchParams.get("verificationCode");
  const code = searchParams.get("code");
  
  const getGoogleLoginLink = async ()=> {
    try {
      const {link} = await getGoogleLoginLinkApi();
      window.location.href = link;
    }
    catch(error) {
      console.log(error);
    }
  }

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
  }, [verificationCode, setSearcParams]);

  useEffect(()=> {
    if(code) {
      dispatch(loginWithGoogle(code));
    }
  }, [code, dispatch]);

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
      <Button onClick={getGoogleLoginLink}>Login with Google</Button>
      {error && <Error>{error}</Error>}
    </Paper>
  );
};

export default Login;
