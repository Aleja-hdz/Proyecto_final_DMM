// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTVgjmdD9pYuzkNbO-VN_Ka_dVUxVqs-4",
  authDomain: "permisosapp-3117d.firebaseapp.com",
  projectId: "permisosapp-3117d",
  storageBucket: "permisosapp-3117d.firebasestorage.app",
  messagingSenderId: "384488346779",
  appId: "1:384488346779:web:a514d23aad05a55126223e",
  measurementId: "G-41PM7BY37V"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);

export const auth = getAuth(firebase);

export const firebase_db = getFirestore(firebase);