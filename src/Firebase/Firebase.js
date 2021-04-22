import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDoN-nSGUo_1h87nkOXSXX2vv4IBXBXey0",
  authDomain: "chatify-49.firebaseapp.com",
  projectId: "chatify-49",
  storageBucket: "chatify-49.appspot.com",
  messagingSenderId: "1034185885241",
  appId: "1:1034185885241:web:a46af138b7a40d318defe8",
  measurementId: "G-EHQ2YBVYY9",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
