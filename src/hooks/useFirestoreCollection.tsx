import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from 'utilities/firebase';

export const useFirestoreCollection = (collectionName: string) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const q = query(collection(firestore, collectionName));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setData(docs);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      },
    );
    return unsubscribe;
  }, [collectionName, firestore]);

  return { data, loading, error };
};
