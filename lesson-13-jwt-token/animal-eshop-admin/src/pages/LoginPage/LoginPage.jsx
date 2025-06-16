import Stack from "@mui/material/Stack";

import LoginForm from "../../modules/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <LoginForm />
    </Stack>
  );
};

export default LoginPage;
