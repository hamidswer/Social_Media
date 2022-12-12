import React from "react";
import "./GoogleLoginButton.css";
function GoogleLoginButton({ login }) {
  const handle = () => {
    window.location.href = "http://localhost:5000/auth/login/google";
    return null;
  };
  return (
    <div className="googleLogin">
      <button type="button" className="login-with-google-btn" onClick={handle}>
        {login ? "Log in with Google" : "Sign up with Google"}
      </button>
    </div>
  );
}

export default GoogleLoginButton;
