import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBFscrEXE532bHx-LCeSdAV3CZIhXHQ1RA",
    authDomain: "form-react-8f3be.firebaseapp.com",
    databaseURL: "https://form-react-8f3be-default-rtdb.firebaseio.com/",
    projectId: "form-react-8f3be",
    storageBucket: "form-react-8f3be.appspot.com",
    messagingSenderId: "1007820304019",
    appId: "1:1007820304019:web:eace3618528089ceebe766",
    measurementId: "G-1PMPRCM7TL"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export {database};

