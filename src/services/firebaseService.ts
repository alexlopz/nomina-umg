import { collection, getDocs, query } from 'firebase/firestore';
import { firestore } from 'utilities/firebase';

export const queryFirebase = async (expresion: any, collectionName: string): Promise<any> => {
  const q = query(collection(firestore, collectionName), expresion);
  try {
    const snapshot = await getDocs(q);
    const result = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return result;
  } catch (error) {
    console.error('Error fetching Firestore data:', error);
    return [];
  }
};
