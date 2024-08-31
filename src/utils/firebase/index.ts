import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCUyU-_N0JtAxgid4EcgIzQHGUpV657-U0",
    authDomain: "schedule-faye.firebaseapp.com",
    projectId: "schedule-faye",
    storageBucket: "schedule-faye.appspot.com",
    messagingSenderId: "22320357435",
    appId: "1:22320357435:web:d7151e373136ceac15bc1e"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const githubProvider = new GithubAuthProvider();
