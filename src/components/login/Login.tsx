import React from "react";
import "./Login.scss";

import Face3Icon from "@mui/icons-material/Face3";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";

const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider).catch((err) => {
      alert(err.message);
    });
  };
  return (
    <div className="login">
      <div className="loginLogo">
        <Face3Icon />
      </div>

      <button onClick={signIn}>login</button>
    </div>
  );
};

export default Login;
