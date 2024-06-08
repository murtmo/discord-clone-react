import React from "react";
import "./Chat.scss";

import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifBoxIcon from "@mui/icons-material/GifBox";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useAppSelector } from "../../app/hooks";

const Chat = () => {
  const channelName = useAppSelector((state) => state.channel.channelName);

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
          <input type="text" placeholder="#Udemy へメッセージを送る" />
          <button type="submit" className="chatInputButton"></button>
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
