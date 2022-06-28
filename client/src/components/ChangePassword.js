import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cpAction } from "../api";

function ChangePassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await cpAction({ email, password });
      if (response.status >= 200) {
        setPasswordChanged(true);
        navigate("../user/login");
      }
    } catch (error) {}
  }
  return (
    <div className="change-password shadow">
      {!passwordChanged ? (
        <>
          <h3 className="heading">Change password</h3>
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
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
        </>
      ) : (
        <h2>Password changed successfully</h2>
      )}
    </div>
  );
}

export default ChangePassword;
