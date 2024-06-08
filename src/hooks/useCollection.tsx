import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  onSnapshot,
  DocumentData,
  Query,
} from "firebase/firestore";

interface Channels {
  id: string;
  channel: DocumentData;
}

const useCollection = (data: string) => {
  const [documents, setDocuments] = useState<Channels[]>([]);
  const collectionRef: Query<DocumentData> = query(collection(db, data));

  useEffect(() => {
    const documentsResults: Channels[] = [];
    onSnapshot(collectionRef, (querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        documentsResults.push({
          id: doc.id,
          channel: doc.data(),
        });
      });
      setDocuments(documentsResults);
    });
  }, []);

  return { documents };
};

export default useCollection;
