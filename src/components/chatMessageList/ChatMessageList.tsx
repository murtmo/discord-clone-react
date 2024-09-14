import { Message } from "../../types/Types";

// styles
import styles from "./ChatMessageList.module.scss";

// components
import ChatMessage from "../chatMessage/ChatMessage";

type Props = {
  messages: Message[];
  channelId: string | null;
};

const ChatMessageList = (props: Props) => {
  const { messages, channelId } = props;

  const haveMessage = messages.length !== 0;
  console.log(haveMessage);

  return (
    <div className={styles.ChatMessageList}>
      {haveMessage ? (
        messages.map((message) => {
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
        })
      ) : (
        <p className={styles.nomessage}>メッセージはまだないみたいです😯</p>
      )}
    </div>
  );
};

export default ChatMessageList;
