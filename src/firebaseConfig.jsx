// https://blasttrade-d223b.firebaseapp.com/__/auth/handler
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, TwitterAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAZ1-sntELTrygOO3lFCxSpLhlzV0whnkk",
  authDomain: "blasttrade-baa2f.firebaseapp.com",
  projectId: "blasttrade-baa2f",
  storageBucket: "blasttrade-baa2f.appspot.com",
  messagingSenderId: "101525758389",
  appId: "1:101525758389:web:09b2bd2fca52d9eba7f9fc",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db, TwitterAuthProvider };
