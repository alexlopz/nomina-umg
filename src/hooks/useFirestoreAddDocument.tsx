import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from 'utilities/firebase';

export const useFirestoreAddDocument = (collectionName: string, initialData: any) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const docRef = await addDoc(collection(firestore, collectionName), {
        ...initialData,
      });
      setData({ ...initialData, id: docRef.id });
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      if (typeof err === 'function' || err === null) {
        setError(err);
      }
      setLoading(false);
      setSuccess(false);
    }
  };

  return {
    data,
    loading,
    error,
    handleSubmit,
    success,
  };
};
