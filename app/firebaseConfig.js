import { initializeApp, getApps } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQEL5f0akT9FRIjDdzdyotvIu0wGMXgQA",
  authDomain: "evcharge-72659.firebaseapp.com",
  projectId: "evcharge-72659",
  storageBucket: "evcharge-72659.appspot.com", // Fixed typo: 'firebaseStorage.app' -> 'firebaseapp.com'
  messagingSenderId: "327381179499",
  appId: "1:327381179499:web:fafdcf2cfa44f7853ae52e",
};

// Initialize Firebase only if not already initialized
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Auth with persistence for React Native
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (err) {
  // Fallback to getAuth if already initialized
  auth = getAuth(app);
}

const db = getFirestore(app);

export { app, auth, db };
