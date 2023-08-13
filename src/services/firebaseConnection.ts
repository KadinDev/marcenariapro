
// SIGA OS EXEMPLOS DA DOCUMENTAÇÃO
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvTZt6Bdg5t0rJuULVTsojENMnYQ5aNtQ",
  authDomain: "marcenariapro-8446e.firebaseapp.com",
  projectId: "marcenariapro-8446e",
  storageBucket: "marcenariapro-8446e.appspot.com",
  messagingSenderId: "951185544708",
  appId: "1:951185544708:web:73d7ac0e7067838300c751",
  measurementId: "G-2QCCC1C70H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
