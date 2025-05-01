import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDcmCLaHr6cYmIW9vg-K7gQmqboTkyiAKs",
  authDomain: "nfc-animal-passport-79860.firebaseapp.com",
  projectId: "nfc-animal-passport-79860",
  storageBucket: "nfc-animal-passport-79860.firestorage.app",
  messagingSenderId: "613542527304",
  appId: "1:613542527304:web:437ca44eac0ed73d6d737d",
  measurementId: "G-BHNFJR7Q95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Analytics
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };

// Enable logging in development
if (process.env.NODE_ENV === 'development') {
  console.log('Firebase Config:', firebaseConfig);
} 