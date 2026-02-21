// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_API,
  authDomain: "food-delivery-v1-react-express.firebaseapp.com",
  projectId: "food-delivery-v1-react-express",
  storageBucket: "food-delivery-v1-react-express.firebasestorage.app",
  messagingSenderId: "930873159996",
  appId: "1:930873159996:web:95901e09d7b1b84125ae39",
  measurementId: "G-34MFR1V520"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
export {app,auth}