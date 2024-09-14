import React from "react";
import "./ChatMessage.scss";

import { Avatar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { Timestamp, deleteDoc, doc } from "firebase/firestore";

import { db } from "../../firebase";

type Props = {
  message: string;
  timestamp: Timestamp;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
  messageId: string; // メッセージのIDを追加
  channelId: string; // チャンネルのIDを追加
};

const ChatMessage = (props: Props) => {
  const { message, timestamp, user, messageId, channelId } = props;

  const deleteMessage = async () => {
    if (window.confirm("本当にこのメッセージを削除しますか？")) {
      try {
        await deleteDoc(doc(db, "channels", channelId, "messages", messageId));
        console.log("Message successfully deleted!");
      } catch (error) {
        console.error("Error removing message: ", error);
      }
    }
  };
  return (
    <div className="chatMessage">
      <div className="messageInfo">
        <p className="userIcon">
          <Avatar src={user?.photo} />
        </p>
        <p className="userName">{user?.displayName}</p>
        <p className="messageTime">{timestamp.toDate().toLocaleString()}</p>
        <IconButton onClick={deleteMessage} size="small">
          <DeleteIcon />
        </IconButton>
      </div>
      <p className="messageData">{message}</p>
    </div>
  );
};
export default ChatMessage;
