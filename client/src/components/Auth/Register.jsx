import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../redux/api";
import { useEffect } from "react";

function Register() {
  const navigate = useNavigate();
  const [signup, { data:response, isSuccess }] = useSignupMutation();
  const [firstNameField, setFirstNameField] = useState("");
  const [lastNameField, setLastNameField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [password2Field, setPassword2Field] = useState("");

  const onSubmit = async (val) => {
    const data = {
      firstName: firstNameField,
      lastName: lastNameField,
      email: emailField,
      password: passwordField,
      confirmPassword: password2Field,
    };
    val.preventDefault();
    await signup(data);
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("user", JSON.stringify(response.result));
      navigate("/rooms");
    }
    //eslint-disable-next-line
  },[isSuccess])

  return (
    <div>
      <Typography
        variant="h4"
        color="textPrimary"
      >
        Register
      </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          required
          variant="outlined"
          id="firstName"
          label="firstName"
          type="firstName"
          value={firstNameField}
          onChange={(e) => setFirstNameField(e.target.value)}
          style={{ marginTop: "10px", width: "28vw" }}
        />
        <br />
        <TextField
          required
          variant="outlined"
          id="lastName"
          label="lastName"
          type="lastName"
          value={lastNameField}
          onChange={(e) => setLastNameField(e.target.value)}
          style={{ marginTop: "10px", width: "28vw" }}
        />
        <br />
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
        <TextField
          required
          variant="outlined"
          id="password2"
          label="Confirm Password"
          type="password2"
          value={password2Field}
          onChange={(e) => setPassword2Field(e.target.value)}
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

export default Register;
