import "firebase/compat/auth";

import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWCIgl7WwAabGfYpTJLliXQBgWJgFXqnw",
  authDomain: "jb--clone.firebaseapp.com",
  projectId: "jb--clone",
  storageBucket: "jb--clone.appspot.com",
  messagingSenderId: "207449431375",
  appId: "1:207449431375:web:ea1bc74c6fe4fdbf49f93a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage();
export { db, auth, provider, storage };
