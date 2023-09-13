// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASkAaav9s341N5fhudkclNVR7Qjo4nDUE",
  authDomain: "slik-solution.firebaseapp.com",
  projectId: "slik-solution",
  storageBucket: "slik-solution.appspot.com",
  messagingSenderId: "704446613453",
  appId: "1:704446613453:web:950bdf6357ff7fbcfba684",
  measurementId: "G-R2W49QWZMC"
};

const firebaseApp = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());


export default dbRef;