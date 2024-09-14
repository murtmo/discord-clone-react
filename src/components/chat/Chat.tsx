import React, { useState } from "react";
import "./Chat.scss";

import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { useAppSelector } from "../../app/hooks";
import {
  addDoc,
  collection,
  serverTimestamp,
  DocumentData,
  CollectionReference,
} from "firebase/firestore";
import { db } from "../../firebase";
import useSubCollection from "../../hooks/useSubCollection";

const Chat = () => {
  const [inputText, setInputText] = useState<string>("");
  const channelId = useAppSelector((state) => state.channel.channelId);

  const channelName = useAppSelector((state) => state.channel.channelName);
  const user = useAppSelector((state) => state.user.user);

  const { subDocuments: messages } = useSubCollection("channels", "messages");

  const timestamp = serverTimestamp();

  const collectionRef: CollectionReference<DocumentData> = collection(
    db,
    "channels",
    String(channelId),
    "messages"
  );

  const sendMessage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    // 空のメッセージを送信しないようにチェックを追加
    if (inputText.trim() === "") return;

    // channels コレクションの中の messages コレクションの中に情報を入れる
    // 情報... date(timestap), user, message(inputText)

    await addDoc(collectionRef, {
      message: inputText,
      timestamp: timestamp,
      user: user,
    });

    setInputText("");
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chatMessageWrap">
        {messages.map((message) => {
          return (
            <ChatMessage
              key={message.id}
              message={message.message}
              timestamp={message.timestamp}
              user={message.user}
              messageId={message.id}
              channelId={String(channelId)}
            />
          );
        })}
      </div>
      <div className="chatInput">
        <div className="chatInputAddIcon">
          <AddCircleOutlineIcon />
        </div>

        <form>
          <input
            type="text"
            placeholder={`${channelName} にメモする`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInputText(e.target.value);
            }}
            value={inputText}
          />
          <button
            type="submit"
            className="chatInputButton"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              sendMessage(e);
            }}
          ></button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
