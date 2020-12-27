import firebase from 'firebase/app';
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAqQ2--_V-dY9vxVB8QEc7qu-aBDQb6V14",
  authDomain: "sale-hoze-storeg.firebaseapp.com",
  projectId: "sale-hoze-storeg",
  storageBucket: "sale-hoze-storeg.appspot.com",
  messagingSenderId: "417221222158",
  appId: "1:417221222158:web:320cde4d57f6ff2d24415f"
};

export const app = firebase.initializeApp(firebaseConfig);