import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { auth } from "./firebase";
import { login, logout } from "./features/userSlice";

import "./App.scss";

import Navigation from "./components/navigation/Navigation";
import Chat from "./components/chat/Chat";
import Login from "./components/login/Login";
import Footer from "./components/footer/Footer";

function App() {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

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
    <div className="App">
      {user ? (
        <>
          <Navigation />
          <main>
            <Chat />
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
