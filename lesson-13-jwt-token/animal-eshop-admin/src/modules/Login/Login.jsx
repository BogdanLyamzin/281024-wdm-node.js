import { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Error from "../../shared/components/Error/Error";

import LoginForm from "../LoginForm/LoginForm";

import { loginUserApi } from "../../shared/api/auth-api";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitForm = async (payload) => {
    try {
        setLoading(true);
        setError(null);
        const data = await loginUserApi(payload);
        console.log(data);
    } 
    catch (error) {
        setError(error.response?.data?.message || error.message);
    }
    finally {
        setLoading(false);
    }
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        width: "300px",
        padding: "15px",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h5" textAlign="center" gutterBottom>
        Login to enter dashboard
      </Typography>
      <LoginForm submitForm={submitForm} loading={loading} />
      {error && <Error>{error}</Error>}
    </Paper>
  );
};

export default Login;
