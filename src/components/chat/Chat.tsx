import { channelData } from "../../types/Types";

// styles
import styles from "./Chat.module.scss";

// hooks
import useSubCollection from "../../hooks/useSubCollection";

// components
// import ChatHeader from "../chatHeader/ChatHeader";
import ChatInputArea from "../chatInputArea/ChatInputArea";
import ChatMessageList from "../chatMessageList/ChatMessageList";

const Chat = (props: channelData) => {
  const { channelId, channelName } = props;

  const { subDocuments: messages } = useSubCollection("channels", "messages");

  return (
    <div className={styles.chat}>
      {channelId && (
        <>
          {/* <div className={styles.container}>
            <ChatHeader channelName={channelName} />
          </div> */}
          <div className={`${styles.container} ${styles.chatMessageWrap}`}>
            <ChatMessageList messages={messages} channelId={channelId} />
          </div>
          <ChatInputArea channelName={channelName} />
        </>
      )}
    </div>
  );
};

export default Chat;
