import React from "react";
import styles from "./ChannelName.module.scss";

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
      className={styles.channelName}
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
    </div>
  );
};
export default ChannelName;
