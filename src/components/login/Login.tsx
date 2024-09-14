import styles from "./Login.module.scss";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";

const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider).catch((err) => {
      alert(err.message);
    });
  };
  return (
    <div className={styles.login}>
      <h1 className={styles.loginTitle}>Welcome to Chat Chat 🦉🌙</h1>
      <div className={styles.loginButtonList}>
        <button className={styles.loginButton} onClick={signIn}>
          Log In
        </button>
        {/* <button className="login-button guest">Join as Guest</button> */}
      </div>
    </div>
  );
};

export default Login;
