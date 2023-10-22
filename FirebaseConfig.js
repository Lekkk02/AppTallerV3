import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, inMemoryPersistence } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUK9esRaEwaF4iU6F2vo-N_W7T36dLVFw",
  authDomain: "daapp-9d2cb.firebaseapp.com",
  projectId: "daapp-9d2cb",
  storageBucket: "daapp-9d2cb.appspot.com",
  messagingSenderId: "76641019132",
  appId: "1:76641019132:web:4be6b2049bdf90c1aaa379",
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: inMemoryPersistence,
});

export const FIREBASE_APP = app;
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
