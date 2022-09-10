import {
  Container,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React from "react";
import Login from "./Login";
import Register from "./Register";

const AuthContainer = () => {
  const [alignment, setAlignment] = React.useState("login");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Container style={{ marginTop: "25px" }}>
      <Paper elevation={5} style={{ padding: "10px", maxWidth: "30vw" }}>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="login">Login</ToggleButton>
          <ToggleButton value="register">Register</ToggleButton>
        </ToggleButtonGroup>
        {alignment === "login" ? <Login /> : <Register />}
      </Paper>
    </Container>
  );
};

export default AuthContainer;
