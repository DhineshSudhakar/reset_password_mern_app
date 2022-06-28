import React, { useState } from "react";
import { rpAction } from "../api";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState();
  const [token, setToken] = useState();
  const [resetAccepted, setResetAccepted] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await rpAction({ email, token });
      if (response.status >= 200) {
        setResetAccepted(true);
        navigate("../user/change-password");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="reset-password shadow">
      {!resetAccepted ? (
        <>
          <h3 className="heading">Reset password</h3>
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
              <label htmlFor="token" className="form-label">
                Token
              </label>
              <input
                type="text"
                className="form-control"
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                aria-describedby="emailHelp"
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
        <h2>Verification success</h2>
      )}
    </div>
  );
}

export default ResetPassword;
