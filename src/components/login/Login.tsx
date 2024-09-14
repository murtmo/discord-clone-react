import "./Login.scss";

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
      <h1 className="login-title">Welcome to Chat Chat 🦉🌙</h1>
      <div className="login-button-list">
        <button className="login-button" onClick={signIn}>
          Log In
        </button>
        {/* <button className="login-button guest">Join as Guest</button> */}
      </div>
    </div>
  );
};

export default Login;
