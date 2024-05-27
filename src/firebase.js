// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "x-nextjs-clone-424211.firebaseapp.com",
  projectId: "x-nextjs-clone-424211",
  storageBucket: "x-nextjs-clone-424211.appspot.com",
  messagingSenderId: "801713246613",
  appId: "1:801713246613:web:974da3f9a804358567269c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
