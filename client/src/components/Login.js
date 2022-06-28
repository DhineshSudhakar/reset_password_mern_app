import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginAction } from "../api";

import "./main.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    const data = {
      email,
      password,
    };
    e.preventDefault();
    try {
      const response = await loginAction(data);
      console.log(typeof response.status);
      if (response.status === 200 || response.status > 200) {
        setIsLoggedIn(true);
        console.log(isLoggedIn);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="login shadow">
      {!isLoggedIn ? (
        <>
          <h3 className="heading">Login</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="password"
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary"
            >
              Login
            </button>
          </form>
          <div className="mt-2 mb-3 text-center">
            <span>
              <Link className="link" to={`../user/forgot-password`}>
                Forgot password ?
              </Link>
            </span>
          </div>
          <div className="mt-2 mb-3 text-center">
            Don't have account.{" "}
            <span>
              <Link className="link" to={`../user/signup`}>
                Signup here
              </Link>
            </span>
          </div>
        </>
      ) : (
        <h2>LoggedIn successfully</h2>
      )}
    </div>
  );
}

export default Login;
