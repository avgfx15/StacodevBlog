// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mernblog-6725b.firebaseapp.com',
  projectId: 'mernblog-6725b',
  storageBucket: 'mernblog-6725b.firebasestorage.app',
  messagingSenderId: '888651826951',
  appId: '1:888651826951:web:0ce98b6a382f4dbd73e7a2',
  measurementId: 'G-7E2CEN4L87',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
