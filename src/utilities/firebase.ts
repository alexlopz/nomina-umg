import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA4z7oQLS-or14u4GTImCGsDwatOvypNfk',
  authDomain: 'nomina-u.firebaseapp.com',
  projectId: 'nomina-u',
  storageBucket: 'nomina-u.appspot.com',
  messagingSenderId: '67779090458',
  appId: '1:67779090458:web:c93e278b8c89425d1119a3',
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
