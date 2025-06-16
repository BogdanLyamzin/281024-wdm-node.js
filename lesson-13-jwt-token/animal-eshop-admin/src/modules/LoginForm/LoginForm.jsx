import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import loginSchema from "./loginSchema";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (values) => {
    console.log(values);
    reset();
  };
  console.log(errors);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={errors.email}
          helperText={errors.email?.message}
          {...register("email")}
          label="email"
          variant="filled"
          fullWidth
          sx={{ marginBottom: "15px" }}
        />
        <TextField
          error={errors.password}
          helperText={errors.password?.message}
          {...register("password")}
          label="password"
          type="password"
          variant="filled"
          fullWidth
          sx={{ marginBottom: "15px" }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          loadingPosition="start"
        >
          Login
        </Button>
      </form>
    </Paper>
  );
};

export default LoginForm;
