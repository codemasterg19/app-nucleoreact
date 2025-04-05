
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAfZqPnqGj-_7HaJ0NAmUYag1i1q3qRoLQ",
  authDomain: "nucleo-moviles-64ae3.firebaseapp.com",
  databaseURL: "https://nucleo-moviles-64ae3-default-rtdb.firebaseio.com",
  projectId: "nucleo-moviles-64ae3",
  storageBucket: "nucleo-moviles-64ae3.firebasestorage.app",
  messagingSenderId: "864763294728",
  appId: "1:864763294728:web:810a6bf12b797a27ff8dbd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app)
export const auth = getAuth();