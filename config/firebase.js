// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBe-xKvTyNbYBTLWJVUEVBC-L3GGGy2tE",
  authDomain: "info-6132-lab04-eventsapp.firebaseapp.com",
  projectId: "info-6132-lab04-eventsapp",
  storageBucket: "info-6132-lab04-eventsapp.firebasestorage.app",
  messagingSenderId: "104377168050",
  appId: "1:104377168050:web:9728d10fdabdd3823399ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


export { auth }