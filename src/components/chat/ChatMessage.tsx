import React from "react";
import "./ChatMessage.scss";

import { Avatar } from "@mui/material";

import { Timestamp } from "firebase/firestore";

type Props = {
  message: string;
  timestamp: Timestamp;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
};

const ChatMessage = (props: Props) => {
  const { message, timestamp, user } = props;
  return (
    <div className="chatMessage">
      <div className="messageInfo">
        <p className="userIcon">
          <Avatar src={user?.photo} />
        </p>
        <p className="userName">{user?.displayName}</p>
        <p className="messageTime">{timestamp.toDate().toLocaleString()}</p>
      </div>
      <p className="messageData">{message}</p>
    </div>
  );
};
export default ChatMessage;
