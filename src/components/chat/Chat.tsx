import { channelData } from "../../types/Types";

// styles
import styles from "./Chat.module.scss";

// redux
import useSubCollection from "../../hooks/useSubCollection";

// components
import ChatHeader from "../chatHeader/ChatHeader";
import ChatInputArea from "../chatInputArea/ChatInputArea";
import ChatMessageList from "../chatMessageList/ChatMessageList";
import ChatStart from "../chatStart/ChatStart";

const Chat = (props: channelData) => {
  const { channelId, channelName } = props;

  const { subDocuments: messages } = useSubCollection("channels", "messages");

  return (
    <div className={styles.chat}>
      {channelId ? (
        <>
          <div className={styles.container}>
            <ChatHeader channelName={channelName} channelId={channelId} />
          </div>
          <div className={`${styles.container} ${styles.chatMessageWrap}`}>
            <ChatMessageList messages={messages} channelId={channelId} />
          </div>
          <ChatInputArea channelName={channelName} />
        </>
      ) : (
        <div className={styles.chatStartWrap}>
          <ChatStart />
        </div>
      )}
    </div>
  );
};

export default Chat;
