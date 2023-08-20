// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUJBiwXoA - NJZX3WahVJReY2NX_J9eJ0k",
  authDomain: "cigar-qr-prod.firebaseapp.com",
  projectId: "cigar-qr-prod",
  storageBucket: "cigar-qr-prod.appspot.com",
  messagingSenderId: "170818290722",
  appId: "1:170818290722:web:b6dca3dbce891b2104b67b",
  measurementId: "G-WTYJBCNHCH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//From here is us adding stuff
//we are getting access to firestore database
export const db = getFirestore(app);

//we are getting access to images in storage
export const storage = getStorage(app);

//auth
export const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

//sign in the user
export const signInWithEmail = async (email, password) => {
  if (!email && !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

//it listens for users if they are signed in
export const userStateListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

//signs out the user
export const SignOutUser = async () => await signOut(auth);

//Create user
export const createNewUser = async (email, password) => {
  if (!email && !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
