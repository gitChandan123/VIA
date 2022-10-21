import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import Login from "./Login";
import Register from "./Register";

const AuthContainer = () => {
  const [alignment, setAlignment] = React.useState("login");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div className="container h-100 center d-flex flex-column justify-content-center pt-3">
      <ToggleButtonGroup
        className="center"
        value={alignment}
        exclusive
        onChange={handleChange}
        sx={{ bgcolor: "whitesmoke" }}
      >
        <ToggleButton value="login">Login</ToggleButton>
        <ToggleButton value="register">Register</ToggleButton>
      </ToggleButtonGroup>
      {alignment === "login" ? <Login /> : <Register />}
    </div>
  );
};

export default AuthContainer;
