// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrr672SyQOjJ-K6HTbyFeYa6r1MmoA3T4",
  authDomain: "fruitsaladplanningpoker.firebaseapp.com",
  databaseURL:
    "https://fruitsaladplanningpoker-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fruitsaladplanningpoker",
  storageBucket: "fruitsaladplanningpoker.appspot.com",
  messagingSenderId: "760041473770",
  appId: "1:760041473770:web:70f16b46cf40f2b8cc3993",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
