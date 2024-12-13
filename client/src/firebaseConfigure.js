// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mernblog-d2d48.firebaseapp.com',
  projectId: 'mernblog-d2d48',
  storageBucket: 'mernblog-d2d48.firebasestorage.app',
  messagingSenderId: '714618362052',
  appId: '1:714618362052:web:55be630b9723ed8b781191',
  measurementId: 'G-7E2CEN4L87',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
