// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBrO1UreyyzZSr6bvUmzRMonm8dDfcyhNY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "music-e-commerce.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "music-e-commerce",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "music-e-commerce.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "101493812602",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:101493812602:web:6ca2d49f17441e36b83ac3",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-EN8BS1SQ46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, auth, storage, db, analytics }; 