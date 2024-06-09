import React, { useEffect, useState } from "react";
import "./Chat.scss";

import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifBoxIcon from "@mui/icons-material/GifBox";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

import { useAppSelector } from "../../app/hooks";
import {
  addDoc,
  collection,
  serverTimestamp,
  DocumentData,
  CollectionReference,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

interface Messages {
  message: string;
  timestamp: Timestamp;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

const Chat = () => {
  const [inputText, setInputText] = useState<string>("");
  const [messages, setMessages] = useState<Messages[]>([]);
  console.log(messages);

  const channelName = useAppSelector((state) => state.channel.channelName);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const user = useAppSelector((state) => state.user.user);

  const collectionRef: CollectionReference<DocumentData> = collection(
    db,
    "channels",
    String(channelId),
    "messages"
  );

  useEffect(() => {
    console.log(" ---------- useEffect of Chat.tsx ----------");

    onSnapshot(collectionRef, (snapshot) => {
      let results: Messages[] = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          message: doc.data().message,
          timestamp: doc.data().timestamp,
          user: doc.data().user,
        });
      });
      setMessages(results);
      console.log(results);
    });
  }, [channelId]);

  const sendMessage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    // channels コレクションの中の messages コレクションの中に情報を入れる
    // 情報... date(timestap), user, message(inputText)

    await addDoc(collectionRef, {
      message: inputText,
      timestamp: serverTimestamp(),
      user: user,
    });
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chatMessageWrap">
        <ChatMessage />
        <ChatMessage />
      </div>
      <div className="chatInput">
        <AddCircleOutlineIcon />
        <form>
          <input
            type="text"
            placeholder={channelName + "へメッセージを送る"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInputText(e.target.value);
            }}
          />
          <button
            type="submit"
            className="chatInputButton"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              sendMessage(e);
            }}
          ></button>
        </form>
        <div className="chatInputIcons">
          <CardGiftcardIcon />
          <GifBoxIcon />
          <EmojiEmotionsIcon />
        </div>
      </div>
    </div>
  );
};

export default Chat;
