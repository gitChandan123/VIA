import React, { useEffect, useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import {useNavigate} from 'react-router-dom'
import { useSigninMutation } from "../redux/api";

function Login() {
  const navigate = useNavigate();
  const [signin, { data: response, isSuccess }] = useSigninMutation();
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");

  const onSubmit = async (val) => {
    const data = {
      email: emailField,
      password: passwordField,
    };
    val.preventDefault();
    await signin(data);
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("user", JSON.stringify(response.result));
      navigate("/join");
    }
    //eslint-disable-next-line
  },[isSuccess])

  return (
    <div>
      <Typography
        variant="h4"
        color="textPrimary"
      >
        Login
      </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          required
          variant="outlined"
          id="email"
          label="Email"
          type="email"
          value={emailField}
          onChange={(e) => setEmailField(e.target.value)}
          style={{ marginTop: "10px", width: "28vw" }}
        />
        <br />
        <TextField
          required
          variant="outlined"
          id="password"
          label="Password"
          type="password"
          value={passwordField}
          onChange={(e) => setPasswordField(e.target.value)}
          style={{ marginTop: "10px", width: "28vw" }}
        />
        <br />
        <Button
          variant="contained"
          type="submit"
          value="submit"
          style={{ marginTop: "10px" }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Login;
