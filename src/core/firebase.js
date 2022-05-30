// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: "AIzaSyCOUJ2GVQuBmicITeiGJGpXU_aYjGGuS0g",
    // authDomain: "s9illo-auth.firebaseapp.com",
    // databaseURL: "https://s9illo-auth-default-rtdb.europe-west1.firebasedatabase.app",
    // projectId: "s9illo-auth",
    // storageBucket: "s9illo-auth.appspot.com",
    // messagingSenderId: "2429425064",
    // appId: "1:2429425064:web:b75b0e3dcd75600460399d"

    apiKey: "AIzaSyBGJhJzJlJDfnU5h-uq56NDka6ZmJkU6Os",
    authDomain: "s9illolatestedition.firebaseapp.com",
    databaseURL: "https://s9illolatestedition-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "s9illolatestedition",
    storageBucket: "s9illolatestedition.appspot.com",
    messagingSenderId: "571948003738",
    appId: "1:571948003738:web:242ae0a20f78f91e8b4a23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase();

import { getStorage, ref } from "firebase/storage";

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storageRef = getStorage(app);
