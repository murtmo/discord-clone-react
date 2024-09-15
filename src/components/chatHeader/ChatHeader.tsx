import styles from "./ChatHeader.module.scss";

// firebase
import { db } from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore";

// redux
import { useAppDispatch } from "../../app/hooks";
import { setChannelInfo } from "../../features/channelSlice";

// props
type Props = {
  channelId: string | null;
  channelName: string | null;
};

const ChatHeader = (props: Props) => {
  const { channelName, channelId } = props;

  const dispatch = useAppDispatch();

  const deleteChannel = async () => {
    if (channelId && window.confirm("本当にこのトークルームを削除しますか？")) {
      try {
        await deleteDoc(doc(db, "channels", channelId));
        console.log("Channel successfully deleted!");
        // チャンネルが削除されたら、選択中のチャンネル情報をリセット
        dispatch(setChannelInfo({ channelId: null, channelName: null }));
      } catch (error) {
        console.error("Error removing channel: ", error);
      }
    }
  };

  return (
    <div className={styles.chatHeader}>
      <h3 className={styles.label} onClick={deleteChannel}>
        <span className={styles.hash}>🏠</span>
        {/* このトークルームを削除する */}
        {channelName} を削除する
      </h3>
    </div>
  );
};

export default ChatHeader;
