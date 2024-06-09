import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  query,
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  Timestamp,
  CollectionReference,
} from "firebase/firestore";
import { useAppSelector } from "../app/hooks";

interface Messages {
  message: string;
  timestamp: Timestamp;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

const useSubCollection = (
  collectionName: string,
  subCollectionName: string
) => {
  // const [messages, setMessages] = useState<Messages[]>([]);
  const [subDocuments, setSubDocuments] = useState<Messages[]>([]);
  const channelId = useAppSelector((state) => state.channel.channelId);

  useEffect(() => {
    console.log(" ---------- useEffect of Chat.tsx ----------");
    const collectionRef: CollectionReference<DocumentData> = collection(
      db,
      collectionName,
      String(channelId),
      subCollectionName
    );

    const collectionRefOrderBy = query(collectionRef, orderBy("timestamp"));

    onSnapshot(collectionRefOrderBy, (snapshot) => {
      let results: Messages[] = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          message: doc.data().message,
          timestamp: doc.data().timestamp,
          user: doc.data().user,
        });
      });
      setSubDocuments(results);
      console.log(results);
    });
  }, [channelId]);

  return { subDocuments };
};

export default useSubCollection;
