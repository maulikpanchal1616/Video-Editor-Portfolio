import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8ANBX867lsIfSrcGTa5A4aeVC-JdHrec",
  authDomain: "het-editor.firebaseapp.com",
  projectId: "het-editor",
  storageBucket: "het-editor.appspot.com",
  messagingSenderId: "965700311297",
  appId: "1:965700311297:web:d37bbc647e6fe1a51b6300"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);