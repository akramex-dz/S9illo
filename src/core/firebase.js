// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCOUJ2GVQuBmicITeiGJGpXU_aYjGGuS0g",
    authDomain: "s9illo-auth.firebaseapp.com",
    databaseURL: "https://s9illo-auth-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "s9illo-auth",
    storageBucket: "s9illo-auth.appspot.com",
    messagingSenderId: "2429425064",
    appId: "1:2429425064:web:b75b0e3dcd75600460399d"

    // apiKey: "AIzaSyB3Yvlmygw0WvFozjErog-8uqjlAw8IDvU",
    // authDomain: "firestoretest-ac5ba.firebaseapp.com",
    // projectId: "firestoretest-ac5ba",
    // storageBucket: "firestoretest-ac5ba.appspot.com",
    // messagingSenderId: "539100111228",
    // appId: "1:539100111228:web:8d8c34a9eda735824d04f9",
    // measurementId: "G-7H4KLDD8QW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase();