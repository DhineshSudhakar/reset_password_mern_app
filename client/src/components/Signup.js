import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupAction } from "../api";

import "./main.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    const data = {
      name,
      email,
      password,
    };
    e.preventDefault();
    try {
      const response = await signupAction(data);
      localStorage.setItem(
        "profile",
        JSON.stringify({ token: response.data.token })
      );
      navigate("../user/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="signup shadow">
      <h3 className="heading">Signup</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            id="name"
          />
        </div>
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
          Submit
        </button>
      </form>
      <div className="mt-2 mb-3 text-end">
        Already signed up.{" "}
        <span>
          <Link className="link" to={`../user/login`}>
            Login here
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Signup;
