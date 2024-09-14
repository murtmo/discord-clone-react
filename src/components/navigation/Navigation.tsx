import styles from "./Navigation.module.scss";

// firebase
import { auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

// hooks
import { useAppSelector } from "../../app/hooks";
import useCollection from "../../hooks/useCollection";

// components
import ChannelListItem from "../channelListItem/ChannelListItem";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TryIcon from "@mui/icons-material/Try";
import LogoutIcon from "@mui/icons-material/Logout";

// props
type Props = {
  channelId: string | null;
};

const Navigation = (props: Props) => {
  const { channelId } = props;

  const user = useAppSelector((state) => state.user.user);
  const { documents: channels } = useCollection("channels");

  const addChannel = async () => {
    let channelName: string | null =
      prompt("チャットタイトルを入力してください");

    if (channelName) {
      await addDoc(collection(db, "channels"), {
        channelName: channelName,
      });
    }
  };

  return (
    <div className={styles.navigation}>
      <div className={styles.navigationInr}>
        <div className={styles.generalData}>
          <div className={styles.serverIconWrap}>
            <div className={styles.serverIcon}>🦉</div>
          </div>
          <div className={styles.accountInfo}>
            <div className={styles.accountIcon}>
              <img src={user?.photo} alt="account icon" />
            </div>
            <div className={styles.logoutIcon} onClick={() => auth.signOut()}>
              <LogoutIcon />
            </div>
          </div>
        </div>
        <div className={styles.channelData}>
          <div className={styles.channelDataInr}>
            <TryIcon className={styles.channelIcon} />
            <div className={styles.channelListWrap}>
              <ul className={styles.channelList}>
                {channels.map((channel) => {
                  return (
                    <ChannelListItem
                      key={channel.id}
                      channel={channel}
                      id={channel.id}
                      currentChannelId={channelId}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
          <AddRoundedIcon
            className={styles.channelAddIcon}
            onClick={() => addChannel()}
          />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
