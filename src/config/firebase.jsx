// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYdN9u8igcWPvyQkYM9a7yZqrpYY-sjk0",
  authDomain: "tesalonica-6a24d.firebaseapp.com",
  projectId: "tesalonica-6a24d",
  storageBucket: "tesalonica-6a24d.appspot.com",
  messagingSenderId: "166949116097",
  appId: "1:166949116097:web:709f32c91472b80fd99c40",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
