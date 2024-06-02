import React from "react";
import "./ChatMessage.scss";

import { Avatar } from "@mui/material";

const ChatMessage = () => {
  return (
    <div className="chatMessage">
      <Avatar />
      <div className="messageInfo">
        <h4>
          murtmo
          <span className="messageTimeStamp">2024/6/1</span>
        </h4>
        <p>メッセージ本文</p>
      </div>
    </div>
  );
};

export default ChatMessage;
