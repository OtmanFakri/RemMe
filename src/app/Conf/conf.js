
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRU_9hUyqHkP8pBsPt0F1WO3c0nOBi1gA",
    authDomain: "events-bc573.firebaseapp.com",
    projectId: "events-bc573",
    storageBucket: "events-bc573.appspot.com",
    messagingSenderId: "1049865141568",
    appId: "1:1049865141568:web:25ed10c5adf41c433e0ea5"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
