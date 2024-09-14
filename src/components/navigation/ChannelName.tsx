import React from "react";
import "./ChannelName.scss";

import { DocumentData } from "firebase/firestore";
import { useAppDispatch } from "../../app/hooks";
import { setChannelInfo } from "../../features/channelSlice";

type Props = {
  id: string;
  channel: DocumentData;
};

const ChannelName = (props: Props) => {
  const { id, channel } = props;
  const dispatch = useAppDispatch();

  return (
    <div
      className="channelName"
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
        <span className="channelNameHash">#</span>
        {channel.channel.channelName}
      </h4>
    </div>
  );
};
export default ChannelName;
