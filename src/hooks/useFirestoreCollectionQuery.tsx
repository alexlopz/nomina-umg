import { collection, getDocs, query } from 'firebase/firestore';
import { useState } from 'react';
import { firestore } from 'utilities/firebase';

export const useFirestoreCollectionQuery = (collectionName: string) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const handleSubmit = async (expresion: any) => {
    const q = query(collection(firestore, collectionName), expresion);
    try {
      const snapshot = await getDocs(q);
      const result = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setData(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error('Error fetching Firestore data:', error);
    }
  };

  return { data, loading, error, handleSubmit };
};
