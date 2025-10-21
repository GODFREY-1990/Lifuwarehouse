import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCN5Lfs8TMjB4PJfYEmGUwpknacOw9d880",
  authDomain: "webapp-99aa2.firebaseapp.com",
  projectId: "webapp-99aa2",
  storageBucket: "webapp-99aa2.firebasestorage.app",
  messagingSenderId: "833936739405",
  appId: "1:833936739405:web:2ea61e5d2e2c8f60ab2004",
  measurementId: "G-ZN7CNMQ4QE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);