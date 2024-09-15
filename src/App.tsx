import { useEffect } from "react";

// styles
import styles from "./App.module.scss";

// firebase
import { auth } from "./firebase";

// redux
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { login, logout } from "./features/userSlice";

// components
import Navigation from "./components/navigation/Navigation";
import Chat from "./components/chat/Chat";
import Login from "./components/login/Login";
import Footer from "./components/footer/Footer";

function App() {
  const dispatch = useAppDispatch();

  // user data
  const user = useAppSelector((state) => state.user.user);

  // channel data
  const channelId = useAppSelector((state) => state.channel.channelId);
  const channelName = useAppSelector((state) => state.channel.channelName);

  useEffect(() => {
    auth.onAuthStateChanged((loginUser) => {
      if (loginUser) {
        dispatch(
          login({
            uid: loginUser.uid,
            photo: loginUser.photoURL,
            email: loginUser.email,
            displayName: loginUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className={styles.App}>
      {user ? (
        <>
          <Navigation channelId={channelId} />
          <main>
            <Chat channelId={channelId} channelName={channelName} />
          </main>
        </>
      ) : (
        <>
          <Login />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
