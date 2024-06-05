import React from "react";
import "./Login.scss";

import Face3Icon from "@mui/icons-material/Face3";

const Login = () => {
  return (
    <div className="login">
      <div className="loginLogo">
        <Face3Icon />
      </div>

      <button>login</button>
    </div>
  );
};

export default Login;
