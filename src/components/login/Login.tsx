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
    <div className={`${styles.login}`}>
      <h1 className={styles.loginTitle}>
        Welcome to&nbsp;
        <br className="sp-only" />
        Turtle Talk Talk
        <span className={styles.icon}>🐢</span>
      </h1>
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
