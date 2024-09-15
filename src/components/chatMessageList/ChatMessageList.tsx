import { Message } from "../../types/Types";

// styles
import styles from "./ChatMessageList.module.scss";

// components
import ChatMessage from "../chatMessage/ChatMessage";

// props
type Props = {
  messages: Message[];
  channelId: string | null;
};

const ChatMessageList = (props: Props) => {
  const { messages, channelId } = props;

  const haveMessage = messages.length !== 0;

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
        <p className={styles.nomessage}>
          トークはまだないみたいです🐢
          <br />
          メッセージを送ってみましょう
        </p>
      )}
    </div>
  );
};

export default ChatMessageList;
