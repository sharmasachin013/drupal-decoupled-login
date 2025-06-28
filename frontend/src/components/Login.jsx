import React, { useState, useEffect } from "react";
import { getAuthClient } from "../lib/auth";

const auth = getAuthClient();

function Login() {
  const [isSubmitting, setSubmitting] = useState(false);

  const [result, setResult] = useState({
    success: null,
    error: null,
    message: "",
  });

  const defaultValues = { name: "", pass: "" };
  const [values, setValues] = useState(defaultValues);

  const [isLoggedIn, setLoggedIn] = useState(false);
  // Only need to do this on first mount.
  useEffect(() => {
    auth
      .isLoggedIn()
      .then((res) => {
        setLoggedIn(true);
      })
      .catch((error) => {
        setLoggedIn(false);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    auth
      .login(values.name, values.pass)
      .then(() => {
        setSubmitting(false);
        setLoggedIn(true);
        setResult({ success: true, message: "Login success" });
      })
      .catch((error) => {
        setSubmitting(false);
        setLoggedIn(false);
        setResult({ error: true, message: `Login error: ${error.message}` });
        console.log("Login error", error);
      });
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setResult({ success: null, message: "" });
  };

  if (isLoggedIn) {
    return (
      <div>
        <p>Welcome {values.name}</p>
        <p>You're currently logged in.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div>
        <p>Logging in, hold tight ...</p>
      </div>
    );
  }

  return (
    <div className="wrapper login-1">
      {(result.success || result.error) && (
        <div>
          <h2>{result.success ? "Success!" : "Error"}:</h2>
          {result.message}
        </div>
      )}
      <div className="container">
        <div className="col-left">
          <div className="login-text">
            <h2>Welcome Back</h2>
            <p>
              Create your account.
              <br />
              It's totally free.
            </p>
            <a className="btn" href="">
              Sign Up
            </a>
          </div>
        </div>
        <div className="col-right">
          <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <p>
                <input
                  name="name"
                  type="text"
                  value={values.name}
                  placeholder="Username"
                  onChange={handleInputChange}
                  required
                />
              </p>
              <p>
                <input
                  name="pass"
                  type="password"
                  value={values.pass}
                  placeholder="Password"
                  onChange={handleInputChange}
                  required
                />
              </p>
              <p>
                <input name="submit" type="submit" value="Login" />
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
