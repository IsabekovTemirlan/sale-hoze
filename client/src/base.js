import firebase from 'firebase/app';
import "firebase/storage";

const apiKey = process.env.REACT_API_KEY;

const firebaseConfig = {
  apiKey,
  authDomain: "sale-hoze-storeg.firebaseapp.com",
  projectId: "sale-hoze-storeg",
  storageBucket: "sale-hoze-storeg.appspot.com",
  messagingSenderId: "417221222158",
  appId: "1:417221222158:web:320cde4d57f6ff2d24415f"
};

export const app = firebase.initializeApp(firebaseConfig);