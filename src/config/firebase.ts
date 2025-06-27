import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, collection, addDoc , deleteDoc  , updateDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBVA8AS7pGZhNdm1pcakPmXv3DNuORlIBU",
    authDomain: "todo-app-1bd31.firebaseapp.com",
    projectId: "todo-app-1bd31",
    storageBucket: "todo-app-1bd31.firebasestorage.app",
    messagingSenderId: "131353222971",
    appId: "1:131353222971:web:341be15427bac1c84b211e",
    measurementId: "G-1WM9CP7GKW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db,
    collection,
    addDoc,
    doc,
    onSnapshot,
    deleteDoc,
    updateDoc
}