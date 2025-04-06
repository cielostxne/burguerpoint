// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-ZOKhTAdczFVZeWvaYkY13GHkCtc4eAA",
  authDomain: "burgerpoint-6709d.firebaseapp.com",
  projectId: "burgerpoint-6709d",
  storageBucket: "burgerpoint-6709d.firebasestorage.app",
  messagingSenderId: "159559873457",
  appId: "1:159559873457:web:d9b07be8c803e704fa0390",
  measurementId: "G-69XW7L52HV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
