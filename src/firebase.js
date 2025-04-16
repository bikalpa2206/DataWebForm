// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration (replace these with your actual credentials)
const firebaseConfig = {
    apiKey: "AIzaSyAqP5Lg1sy5NSiAVA48e11744jTRnaNZy0",
    authDomain: "assets-database-ede58.firebaseapp.com",
    projectId: "assets-database-ede58",
    storageBucket: "assets-database-ede58.firebasestorage.app",
    messagingSenderId: "983326285629",
    appId: "1:983326285629:web:88efe2924b2ecf762a2f54",
    measurementId: "G-NZ4N5TC97M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export the db instance for use in your components
export { db };
