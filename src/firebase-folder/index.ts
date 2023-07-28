import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXOBs4Hb9N03gLjmtZr3SPrn8eU_JFRvo",
  authDomain: "user-registration-c89e3.firebaseapp.com",
  projectId: "user-registration-c89e3",
  storageBucket: "user-registration-c89e3.appspot.com",
  messagingSenderId: "435923845669",
  appId: "1:435923845669:web:57d8bf288b2015fca7b5cc"
};

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app);
export {auth, db}