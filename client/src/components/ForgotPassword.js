import React, { useState } from "react";
import { fpAction } from "../api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLinkSent, setIsLinkSet] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fpAction({ email });
      if (response.status === 200 || response.status > 200) {
        setIsLinkSet(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="forgot-password shadow">
      {!isLinkSent ? (
        <>
          <h3 className="heading">Forgot password</h3>
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
        <h2>Verify your email for the reset link and verification code</h2>
      )}
    </div>
  );
}

export default ForgotPassword;
