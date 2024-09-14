import styles from "./ChannelName.module.scss";

// firebase
import { DocumentData } from "firebase/firestore";

// hooks
import { useAppDispatch } from "../../app/hooks";
import { setChannelInfo } from "../../features/channelSlice";

// props
type Props = {
  id: string;
  channel: DocumentData;
  currentChannelId: string | null;
};

const ChannelName = (props: Props) => {
  const { id, channel, currentChannelId } = props;

  const dispatch = useAppDispatch();

  return (
    <li
      className={
        currentChannelId === id
          ? `${styles.isActive} ${styles.channelName}`
          : `${styles.channelName}`
      }
      onClick={() =>
        dispatch(
          setChannelInfo({
            channelId: id,
            channelName: channel.channel.channelName,
          })
        )
      }
    >
      <h4>
        <span className={styles.channelNameHash}>#</span>
        {channel.channel.channelName}
      </h4>
    </li>
  );
};
export default ChannelName;
