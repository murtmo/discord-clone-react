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
import { auth } from "../../firebase";

const Sidebar = () => {
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
            <AddIcon className="sidebarAddIcon" />
          </div>

          <div className="sidebarChannelsList">
            <SidebarChannel />
            <SidebarChannel />
            <SidebarChannel />
            <SidebarChannel />
            <SidebarChannel />
          </div>

          <div className="sidebarFooter">
            <div className="sidebarAccount">
              <div className="accountIcon">
                <img src="./icon.png" alt="account icon" />
              </div>
              <div className="accountName">
                <p>murtmo</p>
                <span>#8162</span>
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
