// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_JjtaIZE_dWApzdLxrT8oHBRwPSJHQhc",
  authDomain: "akago-app.firebaseapp.com",
  projectId: "akago-app",
  storageBucket: "akago-app.appspot.com",
  messagingSenderId: "1084601486813",
  appId: "1:1084601486813:web:5f8a95e1ba4a35b095ba34",
  measurementId: "G-8DN3BWLGGC",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
