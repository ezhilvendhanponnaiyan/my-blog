// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { Form } from "react-router-dom";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKz-6GNuHVRGjuJGT8uw0CsSbRT5VWDN8",
  authDomain: "my-blog-7a4b1.firebaseapp.com",
  projectId: "my-blog-7a4b1",
  storageBucket: "my-blog-7a4b1.appspot.com",
  messagingSenderId: "497076177002",
  appId: "1:497076177002:web:17e29c1cea8142830ae213",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
