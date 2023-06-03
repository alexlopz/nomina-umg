import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from 'utilities/firebase';

const useFirestoreUpdateDocument = (collection: string, updatedData: any) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const documentRef = doc(firestore, collection, updatedData.id);
      await updateDoc(documentRef, updatedData);
      setData(updatedData);
      setSuccess(true);
    } catch (err) {
      if (typeof err === 'function' || err === null) {
        setError(err);
      }
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, handleSubmit, success };
};

export default useFirestoreUpdateDocument;
