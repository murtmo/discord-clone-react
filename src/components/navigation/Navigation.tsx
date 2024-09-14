import "./Navigation.scss";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TryIcon from "@mui/icons-material/Try";
import LogoutIcon from "@mui/icons-material/Logout";

import ChannelName from "./ChannelName";

import { auth, db } from "../../firebase";
import { useAppSelector } from "../../app/hooks";
import useCollection from "../../hooks/useCollection";
import { addDoc, collection } from "firebase/firestore";

const Navigation = () => {
  const user = useAppSelector((state) => state.user.user);
  const { documents: channels } = useCollection("channels");

  const addChannel = async () => {
    let channelName: string | null =
      prompt("スクラップタイトルを入力してください");

    if (channelName) {
      await addDoc(collection(db, "channels"), {
        channelName: channelName,
      });
    }
  };

  return (
    <div className="navigation">
      <div className="navigationInr">
        <div className="generalData">
          <div className="serverIconWrap">
            <div className="serverIcon">🦉</div>
          </div>
          <div className="accountInfo">
            <div className="accountIcon">
              <img src={user?.photo} alt="account icon" />
            </div>
            {/* <div className="accountName">
              <p>{user?.displayName}</p>
              <span>#{user?.uid.substring(0, 4)}</span>
            </div> */}
            <div className="logoutIcon" onClick={() => auth.signOut()}>
              <LogoutIcon />
            </div>
          </div>
        </div>
        <div className="channelData">
          <div className="channelDataInr">
            <TryIcon className="channelIcon" />
            <div className="channelListWrap">
              <div className="channelList">
                {channels.map((channel) => {
                  return (
                    <ChannelName
                      key={channel.id}
                      channel={channel}
                      id={channel.id}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <AddRoundedIcon
            className="channelAddIcon"
            onClick={() => addChannel()}
          />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
