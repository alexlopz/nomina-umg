import { useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { firestore } from 'utilities/firebase';

export const useFirestoreDeleteDocument = (collectionName: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();

  const handleSubmit = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      await deleteDoc(doc(firestore, collectionName, id));
      setLoading(false);
    } catch (err) {
      console.error(err);
      if (typeof err === 'function' || err === null) {
        setError(err);
      }
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleSubmit,
  };
};
