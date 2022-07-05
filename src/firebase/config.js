import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCAN5Js5JtrrbqlD4EFiG8yhSmhefDmbRE",
  authDomain: "miniblog-1e6fd.firebaseapp.com",
  projectId: "miniblog-1e6fd",
  storageBucket: "miniblog-1e6fd.appspot.com",
  messagingSenderId: "581889260898",
  appId: "1:581889260898:web:2f7cd0d464ac729bd2803b"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }
