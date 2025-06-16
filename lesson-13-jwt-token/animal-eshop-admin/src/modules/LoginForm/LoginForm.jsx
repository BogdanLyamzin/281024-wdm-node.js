import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const LoginForm = () => {
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
      <form action="">
        <TextField
          label="email"
          variant="filled"
          fullWidth
          sx={{ marginBottom: "15px" }}
        />
        <TextField
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
