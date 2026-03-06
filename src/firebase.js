import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8ANBX867lsIfSrcGTa5A4aeVC-JdHrec",
  authDomain: "het-editor.firebaseapp.com",
  projectId: "het-editor",
  storageBucket: "het-editor.firebasestorage.app",
  messagingSenderId: "965700311297",
  appId: "1:965700311297:web:d37bbc647e6fe1a51b6300"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/* THIS LINE IS IMPORTANT */
export const db = getFirestore(app);

export { db };