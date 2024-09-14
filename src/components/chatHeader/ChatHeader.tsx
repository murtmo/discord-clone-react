import styles from "./ChatHeader.module.scss";

type Props = {
  channelName: string | null;
};

const ChatHeader = (props: Props) => {
  const { channelName } = props;
  return (
    <div className={styles.chatHeader}>
      <h3>
        <span className={styles.chatHeaderHash}>#</span>
        {channelName}
      </h3>
    </div>
  );
};

export default ChatHeader;
