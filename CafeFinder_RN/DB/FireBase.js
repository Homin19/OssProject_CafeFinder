// lee ho minsss
import { initializeApp } from "firebase/app";
import firebase from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtRY0aIeIysDITJpL7LPxYkqdjBCAQaWY",
  authDomain: "cafe-finder-a0f0c.firebaseapp.com",
  databaseURL: "https://cafe-finder-a0f0c-default-rtdb.firebaseio.com",
  projectId: "cafe-finder-a0f0c",
  storageBucket: "cafe-finder-a0f0c.appspot.com",
  messagingSenderId: "572005425959",
  appId: "1:572005425959:web:d8fbbac1f945a7d8737f02",
};

const app = initializeApp(firebaseConfig);
const db = firebase.firestore();

export { db };
