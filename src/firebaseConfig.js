// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDSDD0BzmrBSd5PZAdp5XiL4UC14Zf4oY",
  authDomain: "restaurant-app-51ff2.firebaseapp.com",
  projectId: "restaurant-app-51ff2",
  storageBucket: "restaurant-app-51ff2.firebasestorage.app",
  messagingSenderId: "250583846082",
  appId: "1:250583846082:web:2fe0e6f38245b3ea213f5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;