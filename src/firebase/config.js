// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLD5x1SOi_wpRme3Pn_SniHVHPCokZ3qs",
  authDomain: "hotel-booking-8221a.firebaseapp.com",
  projectId: "hotel-booking-8221a",
  storageBucket: "hotel-booking-8221a.appspot.com",
  messagingSenderId: "468889645082",
  appId: "1:468889645082:web:4d6aa59412c0290d6161a3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firebase Storage
const storage = getStorage(app);

// Connect to emulators in development mode only
if (import.meta.env.DEV) {
  try {
    connectAuthEmulator(auth, "http://localhost:9099");
    connectStorageEmulator(storage, "localhost", 9199);
    console.log("Connected to Firebase emulators");
  } catch (error) {
    console.error("Failed to connect to Firebase emulators:", error);
  }
}

export { auth, storage };
