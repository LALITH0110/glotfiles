// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, increment, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Reference to the counter document
const counterRef = doc(db, "counters", "polyglotCount");

// Function to increment the global counter
export const incrementPolyglotCounter = async (): Promise<void> => {
  try {
    await updateDoc(counterRef, {
      count: increment(1),
      lastUpdated: new Date()
    });
  } catch (error) {
    // If document doesn't exist, create it
    console.log("Creating counter document...");
    await setDoc(counterRef, {
      count: 1,
      lastUpdated: new Date()
    });
  }
};

// Function to get the current counter value
export const getPolyglotCounter = async (): Promise<number> => {
  try {
    const docSnap = await getDoc(counterRef);
    if (docSnap.exists()) {
      return docSnap.data().count || 0;
    } else {
      // Initialize counter if it doesn't exist
      await setDoc(counterRef, {
        count: 0,
        lastUpdated: new Date()
      });
      return 0;
    }
  } catch (error) {
    console.error("Error getting counter:", error);
    return 0;
  }
};

// Function to subscribe to real-time counter updates
import { onSnapshot } from "firebase/firestore";

export const subscribeToCounter = (callback: (count: number) => void) => {
  return onSnapshot(counterRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data().count || 0);
    } else {
      callback(0);
    }
  });
};
