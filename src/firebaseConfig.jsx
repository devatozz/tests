// call back twitter https://blattrade.firebaseapp.com/__/auth/handler
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, TwitterAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC6_u5gYciAjsuaLjtbUga8oADQCP-vH3Y",
  authDomain: "blattrade.firebaseapp.com",
  projectId: "blattrade",
  storageBucket: "blattrade.appspot.com",
  messagingSenderId: "504170197043",
  appId: "1:504170197043:web:5f398c28c99c730a513346",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db, TwitterAuthProvider };
