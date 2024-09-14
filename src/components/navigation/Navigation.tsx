import { channelData } from "../../types/Types";

import styles from "./Navigation.module.scss";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TryIcon from "@mui/icons-material/Try";
import LogoutIcon from "@mui/icons-material/Logout";

import ChannelName from "../channelName/ChannelName";

import { auth, db } from "../../firebase";
import { useAppSelector } from "../../app/hooks";
import useCollection from "../../hooks/useCollection";
import { addDoc, collection } from "firebase/firestore";

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
            {/* <div className="accountName">
              <p>{user?.displayName}</p>
              <span>#{user?.uid.substring(0, 4)}</span>
            </div> */}
            <div className={styles.logoutIcon} onClick={() => auth.signOut()}>
              <LogoutIcon />
            </div>
          </div>
        </div>
        <div className={styles.channelData}>
          <div className={styles.channelDataInr}>
            <TryIcon className={styles.channelIcon} />
            <div className={styles.channelListWrap}>
              <div className={styles.channelList}>
                {channels.map((channel) => {
                  return (
                    <ChannelName
                      key={channel.id}
                      channel={channel}
                      id={channel.id}
                      currentChannelId={channelId}
                    />
                  );
                })}
              </div>
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
