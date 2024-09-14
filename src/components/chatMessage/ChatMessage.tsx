import styles from "./ChatMessage.module.scss";

// firebase
import { db } from "../../firebase";
import { Timestamp, deleteDoc, doc } from "firebase/firestore";

// components
import { Avatar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// props
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
    <div className={styles.chatMessage}>
      <div className={styles.messageInfo}>
        <p className={styles.userIcon}>
          <Avatar src={user?.photo} />
        </p>
        {/* <p className={styles.messageData}>{message}</p> */}
        <p className={styles.userName}>{user?.displayName}</p>
        <p className={styles.messageTime}>
          {timestamp.toDate().toLocaleString()}
        </p>
        <IconButton onClick={deleteMessage} size="small">
          <DeleteIcon />
        </IconButton>
      </div>
      <p className={styles.messageData}>{message}</p>
      {/* <div>
        <p className={styles.userName}>{user?.displayName}</p>
        <p className={styles.messageTime}>
          {timestamp.toDate().toLocaleString()}
        </p>
        <IconButton onClick={deleteMessage} size="small">
          <DeleteIcon />
        </IconButton>
      </div> */}
    </div>
  );
};
export default ChatMessage;
