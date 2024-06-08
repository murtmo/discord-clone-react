import React from "react";
import "./Sidebar.scss";

import Face3Icon from "@mui/icons-material/Face3";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import MicIcon from "@mui/icons-material/Mic";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import SidebarChannel from "./SidebarChannel";
import { auth, db } from "../../firebase";
import { useAppSelector } from "../../app/hooks";
import useCollection from "../../hooks/useCollection";
import { addDoc, collection } from "firebase/firestore";

const Sidebar = () => {
  const user = useAppSelector((state) => state.user.user);
  const { documents: channels } = useCollection("channels");

  const addChannel = async () => {
    let channelName: string | null =
      prompt("チャンネルの名前を入力してください");

    if (channelName) {
      await addDoc(collection(db, "channels"), {
        channelName: channelName,
      });
    }
  };

  return (
    <div className="sidebar">
      {/* sidebarLeft */}
      <div className="sidebarLeft">
        <div className="serverIconWrap">
          <div className="serverIcon">
            <Face3Icon />
          </div>
          <div className="serverIcon">
            <Face3Icon />
          </div>
        </div>
        <div className="logoutIcon" onClick={() => auth.signOut()}>
          <LogoutIcon />
        </div>
      </div>
      {/* sidebarRight */}
      <div className="sidebarRight">
        <div className="sidebarTop">
          <h3>Discord</h3>
          <ExpandMoreIcon />
        </div>

        <div className="sidebarChannels">
          <div className="sidebarChannelsHeader">
            <div className="sidebarHeader">
              <ExpandMoreIcon /> プログラミングチャンネル
            </div>
            <AddIcon className="sidebarAddIcon" onClick={() => addChannel()} />
          </div>

          <div className="sidebarChannelsList">
            {channels.map((channel) => {
              return (
                <SidebarChannel
                  key={channel.id}
                  channel={channel}
                  id={channel.id}
                />
              );
            })}
          </div>

          <div className="sidebarFooter">
            <div className="sidebarAccount">
              <div className="accountIcon">
                <img src={user?.photo} alt="account icon" />
              </div>
              <div className="accountName">
                <p>{user?.displayName}</p>
                <span>#{user?.uid.substring(0, 4)}</span>
              </div>
            </div>

            <div className="sidebarVoice">
              <MicIcon />
              <HeadphonesIcon />
              <SettingsIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
