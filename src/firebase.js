// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwCQpShIcefsn5eL90PjUFvy_WlXMRjQ0",
  authDomain: "to-do-app-19436.firebaseapp.com",
  projectId: "to-do-app-19436",
  storageBucket: "to-do-app-19436.appspot.com",
  messagingSenderId: "326219354239",
  appId: "1:326219354239:web:2bdee2097337599fe2af4a",
  measurementId: "G-925T4HZ4TH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };