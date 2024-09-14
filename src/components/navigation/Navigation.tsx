import styles from "./Navigation.module.scss";

// firebase
import { auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

// redux
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import useCollection from "../../hooks/useCollection";
import { setChannelInfo } from "../../features/channelSlice";

// components
import ChannelListItem from "../channelListItem/ChannelListItem";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AppsIcon from "@mui/icons-material/Apps";
import LogoutIcon from "@mui/icons-material/Logout";

// props
type Props = {
  channelId: string | null;
};

const Navigation = (props: Props) => {
  const { channelId } = props;

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user);
  const { documents: channels } = useCollection("channels");

  const addChannel = async () => {
    let channelName: string | null = prompt(
      "新しいトークルーム名を入力してください"
    );

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
          <div
            className={styles.serverIconWrap}
            onClick={() =>
              dispatch(
                setChannelInfo({
                  channelId: null,
                  channelName: null,
                })
              )
            }
          >
            <div className={styles.serverIcon}>🐢</div>
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
            <AppsIcon className={styles.channelIcon} />
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
