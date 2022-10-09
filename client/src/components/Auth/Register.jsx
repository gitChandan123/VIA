import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../redux/api";
import { useEffect } from "react";

function Register() {
  const navigate = useNavigate();
  const [signup, { data: response, isSuccess }] = useSignupMutation();
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
  }, [isSuccess]);

  return (
    // New Register
    <article className=" mine br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <form onSubmit={onSubmit}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>

              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  First Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  name="name"
                  id="firstName"
                  type="text"
                  value={firstNameField}
                  onChange={(e) => setFirstNameField(e.target.value)}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Last Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  id="lastName"
                  type="lastName"
                  value={lastNameField}
                  onChange={(e) => setLastNameField(e.target.value)}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  id="email"
                  type="email"
                  value={emailField}
                  onChange={(e) => setEmailField(e.target.value)}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  required
                  id="password"
                  type="password"
                  value={passwordField}
                  onChange={(e) => setPasswordField(e.target.value)}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Confirm Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  required
                  id="password2"
                  type="password2"
                  value={password2Field}
                  onChange={(e) => setPassword2Field(e.target.value)}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="submit"
              />
            </div>
          </form>
        </div>
      </main>
    </article>
  );
}

export default Register;
