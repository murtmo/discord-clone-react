// styles
import styles from "./Chat.module.scss";

// hooks
import { useAppSelector } from "../../app/hooks";
import useSubCollection from "../../hooks/useSubCollection";

// components
import ChatHeader from "../chatHeader/ChatHeader";
import ChatInputArea from "../chatInputArea/ChatInputArea";
import ChatMessageList from "../chatMessageList/ChatMessageList";

const Chat = () => {
  const channelId = useAppSelector((state) => state.channel.channelId);
  const channelName = useAppSelector((state) => state.channel.channelName);

  const { subDocuments: messages } = useSubCollection("channels", "messages");

  return (
    <div className={styles.chat}>
      {channelName && (
        <>
          <ChatHeader channelName={channelName} />
          <div className={styles.chatMessageWrap}>
            <ChatMessageList messages={messages} channelId={channelId} />
          </div>
          <ChatInputArea channelName={channelName} />
        </>
      )}
    </div>
  );
};

export default Chat;
