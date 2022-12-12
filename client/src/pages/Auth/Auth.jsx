import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Auth.css";
import { setVal } from "../../REDUX/Reducer/User/AuthFormsReducer.js";
import SignInAction from "../../REDUX/Action/Authentication/SignInAction.js";
import SignUpAction from "../../REDUX/Action/Authentication/SignUpAction.js";
import GoogleLoginButton from "../../components/Button/GoogleLoginButton/GoogleLoginButton";

function Auth() {
  const value = useSelector((state) => state.AuthFormsReducer.val);
  return <div className="auth">{value ? <LogIn /> : <SignUp />}</div>;
}

function SignUp() {
  const value = useSelector((state) => state.AuthFormsReducer.val);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.AuthReducer.loading);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [confirmPassword, setConfirmPassword] = useState(true);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (data.password === data.confirmPassword) {
      setConfirmPassword(true);
      dispatch(SignUpAction(data));
    } else {
      setConfirmPassword(false);
    }
  };
  return (
    <div className="auth-right">
      <form action="" className="infoForm authForm" onSubmit={handleSubmit}>
        <div className="Website-name">
          <h5>Welcome to Social Media</h5>
        </div>
        <GoogleLoginButton login={value} />
        <h6>
          <span>Or continue with email</span>
        </h6>
        <div>
          <input
            type="text"
            placeholder="First name"
            className="signup-input"
            name="firstname"
            onChange={handleChange}
            value={data.firstname}
          />
          <input
            type="text"
            placeholder="Last name"
            className="signup-input"
            name="lastname"
            onChange={handleChange}
            value={data.lastname}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="User name"
            className="signup-input"
            name="email"
            onChange={handleChange}
            value={data.email}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="signup-input"
            name="password"
            onChange={handleChange}
            value={data.password}
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="signup-input"
            name="confirmPassword"
            onChange={handleChange}
            value={data.confirmPassword}
          />
        </div>
        <div style={{ display: confirmPassword ? "none" : "block" }}>
          <span
            style={{
              color: "red",
              fontSize: "13px",
            }}
          >
            Password and confirm password does not match. try again!
          </span>
        </div>
        <div className="authFooter">
          <div>
            <button
              className="link-button"
              onClick={() => dispatch(setVal(value + 1))}
            >
              Already have an account. Login!
            </button>
          </div>
          <div>
            <button
              className="button auth-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "SignUp"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function LogIn() {
  const value = useSelector((state) => state.AuthFormsReducer.val);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.AuthReducer.loading);
  const [data, setData] = useState({ email: "", password: "" });
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(SignInAction(data));
  };
  return (
    <div className="auth-right">
      <form action="" className="infoForm authForm" onSubmit={handleSubmit}>
        <div className="Website-name">
          <h4>Welcome to Social Media</h4>
        </div>
        <GoogleLoginButton login={value} />
        <h6 className="lineText">
          <span>Or continue with email</span>
        </h6>
        <div>
          <input
            type="text"
            placeholder="User name"
            className="signup-input"
            name="email"
            onChange={handleChange}
            value={data.email}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="signup-input"
            name="password"
            onChange={handleChange}
            value={data.password}
          />
        </div>
        <div className="authFooter">
          <div>
            <button
              className="link-button"
              onClick={() => dispatch(setVal(value - 1))}
            >
              Don't have an account. Sign up!
            </button>
          </div>
          <div>
            <button
              className="button auth-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Auth;
