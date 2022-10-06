import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSigninMutation } from "../../redux/api";
import { toast } from "react-toastify";
import "../../index.css";

function Login() {
  const navigate = useNavigate();
  const [signin, { data: response, isSuccess, isError, error }] =
    useSigninMutation();
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
      toast.success(`Logged in as ${response.result.name}`);
      navigate("/");
    }
    if (isError) {
      toast.error(error.data.message);
    }
    //eslint-disable-next-line
  }, [isSuccess, isError]);

  return (
    <article className="mine br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <form onSubmit={onSubmit}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  id="email"
                  label="Email"
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
                  id="password"
                  label="Password"
                  type="password"
                  value={passwordField}
                  onChange={(e) => setPasswordField(e.target.value)}
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

export default Login;
