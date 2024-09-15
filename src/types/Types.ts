export interface initialUserState {
  user: null | {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

export interface initialChannelState {
  channelId: string | null;
  channelName: string | null;
}

export type channelData = {
  channelId: string | null;
  channelName: string | null;
};

export type Message = {
  id: string;
  message: string;
  timestamp: any; // TODO:timestampの正確な型を使用する（例：firebase.firestore.Timestamp）
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
};
