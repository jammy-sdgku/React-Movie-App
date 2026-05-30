import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_6w9FBMJbJlc7G7KW1VjUhNb6BQvzgS0",
  authDomain: "reactmovieapp-d16a7.firebaseapp.com",
  projectId: "reactmovieapp-d16a7",
  storageBucket: "reactmovieapp-d16a7.firebasestorage.app",
  messagingSenderId: "150935648510",
  appId: "1:150935648510:web:a5d8916aa09f2939ac0daf",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
