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
    <Container className="br3 b--black-10 mv4 w-100 w-50-m w-25-l mw6 transparent center" >
      
        <ToggleButtonGroup
         
          value={alignment}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="login">Login</ToggleButton>
          <ToggleButton value="register">Register</ToggleButton>
        </ToggleButtonGroup>
        {alignment === "login" ? <Login /> : <Register />}
      {/* </Paper> */}
    </Container>
  );
};

export default AuthContainer;
