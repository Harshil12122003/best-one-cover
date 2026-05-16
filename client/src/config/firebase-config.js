import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDOkZoDeCKS_lGl2dJyLrvpRQTFjxnclAY",
  authDomain: "best1-cover-7bb11.firebaseapp.com",
  projectId: "best1-cover-7bb11",
  storageBucket: "best1-cover-7bb11.appspot.com",
  messagingSenderId: "185664621720",
  appId: "1:185664621720:web:fa6442fcbe0679a50594ed",
  measurementId: "G-VH2Z1TKQNW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);


