import { Backdrop, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useSignupMutation } from "../../redux/api";

function Register() {
  const [signup, { error, isError, isSuccess, isLoading, data: response }] =
    useSignupMutation();
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

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-sm-3 p-md-5 text-center">
                  <div className="p-3 p-sm-1">
                    <h2 className="fw-bold mb-2 text-uppercase">Signup</h2>
                    <p className="text-white-50 mb-3">
                      Please enter your details!
                    </p>
                    {isError && (
                      <div className="alert alert-danger">
                        {error.data.message}
                      </div>
                    )}
                    {isSuccess ? (
                      <div className="alert alert-success">
                        {response.message}
                      </div>
                    ) : (
                      <form onSubmit={onSubmit}>
                        <div className="form-outline form-white mb-4">
                          <input
                            required
                            autoFocus
                            type="text"
                            value={firstNameField}
                            onChange={(e) => setFirstNameField(e.target.value)}
                            placeholder="First Name"
                            className="form-control form-control-lg"
                          />
                        </div>
                        <div className="form-outline form-white mb-4">
                          <input
                            required
                            type="text"
                            value={lastNameField}
                            onChange={(e) => setLastNameField(e.target.value)}
                            placeholder="Last Name"
                            className="form-control form-control-lg"
                          />
                        </div>
                        <div className="form-outline form-white mb-4">
                          <input
                            required
                            id="email"
                            label="Email"
                            type="email"
                            value={emailField}
                            onChange={(e) => setEmailField(e.target.value)}
                            placeholder="Email"
                            className="form-control form-control-lg"
                          />
                        </div>

                        <div className="form-outline form-white mb-4">
                          <input
                            required
                            id="password"
                            label="Password"
                            type="password"
                            value={passwordField}
                            onChange={(e) => setPasswordField(e.target.value)}
                            placeholder="Password"
                            className="form-control form-control-lg"
                          />
                        </div>

                        <div className="form-outline form-white mb-4">
                          <input
                            required
                            id="password2"
                            label="Confirm Password"
                            type="password"
                            value={password2Field}
                            onChange={(e) => setPassword2Field(e.target.value)}
                            placeholder="Confirm Password"
                            className="form-control form-control-lg"
                          />
                        </div>

                        <button
                          className="btn btn-outline-light btn-lg px-5"
                          type="submit"
                        >
                          Signup
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
