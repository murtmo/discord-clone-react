import React, { useState } from "react";

// styles
import styles from "./ChatInputArea.module.scss";

// firebase
import {
  addDoc,
  collection,
  serverTimestamp,
  DocumentData,
  CollectionReference,
} from "firebase/firestore";
import { db } from "../../firebase";

// redux
import { useAppSelector } from "../../app/hooks";

// components
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SendIcon from "@mui/icons-material/Send";

// props
type Props = {
  channelName: string | null;
};

const ChatInputArea = (props: Props) => {
  const { channelName } = props;

  const user = useAppSelector((state) => state.user.user);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const timestamp = serverTimestamp();

  const [inputText, setInputText] = useState<string>("");

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

    // channels コレクションの中の messages コレクションの中に情報を格納する
    await addDoc(collectionRef, {
      message: inputText,
      timestamp: timestamp,
      user: user,
    });

    setInputText("");
  };

  return (
    <div className={styles.chatInputArea}>
      <form className={styles.chatInputForm}>
        <input
          type="text"
          placeholder={`🏠 ${channelName} にメッセージをおくる`}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputText(e.target.value);
          }}
          value={inputText}
        />
        <button
          type="submit"
          className={styles.chatInputAddIcon}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            sendMessage(e);
          }}
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default ChatInputArea;
