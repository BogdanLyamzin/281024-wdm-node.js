import Stack from "@mui/material/Stack";

import Login from "../../modules/Login/Login";

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
      <Login />
    </Stack>
  );
};

export default LoginPage;
