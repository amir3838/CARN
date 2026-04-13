// Firebase initialization (Browser ESM via CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBbco3-3S3xWNRq-guswuPAtEHUxcBYsw",
  authDomain: "carn-b8128.firebaseapp.com",
  projectId: "carn-b8128",
  storageBucket: "carn-b8128.firebasestorage.app",
  messagingSenderId: "400437044907",
  appId: "1:400437044907:web:d7c1994aa016518b13b9ee",
  measurementId: "G-WZJQ7C93B6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Optional global exposure for debugging
window.firebaseApp = app;
window.firebaseAnalytics = analytics;
