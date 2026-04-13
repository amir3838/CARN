import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDBbco3-3S3xWNRq-guswuPAtEHUxcBYsw",
  authDomain: "carn-b8128.firebaseapp.com",
  projectId: "carn-b8128",
  storageBucket: "carn-b8128.firebasestorage.app",
  messagingSenderId: "400437044907",
  appId: "1:400437044907:web:d7c1994aa016518b13b9ee",
  measurementId: "G-WZJQ7C93B6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const signUpEmail = (email, pass) => createUserWithEmailAndPassword(auth, email, pass);
export const signInEmail = (email, pass) => signInWithEmailAndPassword(auth, email, pass);
export const logout = () => signOut(auth);