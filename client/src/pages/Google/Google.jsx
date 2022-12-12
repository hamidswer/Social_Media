import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import SignInGoogleAction from "../../REDUX/Action/Authentication/SignInGoogleAction.js";

function Google() {
  const dispatch = useDispatch();
  const fetchAuthUser = async () => {
    const response = await axios
      .get("http://localhost:5000/auth/login/google/user", {
        withCredentials: true,
      })
      .catch((err) => {
        console.log("Not properly authenticated" + err);
      });
    if (response && response.data) {
      setTimeout(() => {
        dispatch(SignInGoogleAction(response.data));
      }, 100);
      setTimeout(() => {
        window.location.href = "http://localhost:3000/";
      }, 200);
    }
  };
  useEffect(() => {
    fetchAuthUser();
  }, []);
  return <div></div>;
}

export default Google;
