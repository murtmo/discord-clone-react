import React from "react";
import { useAppSelector } from "./app/hooks";
import "./App.scss";

import Sidebar from "./components/sidebar/Sidebar";
import Chat from "./components/chat/Chat";
import Login from "./components/login/Login";

function App() {
  const user = useAppSelector((state) => state.user);

  return (
    <div className="App">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}

export default App;
