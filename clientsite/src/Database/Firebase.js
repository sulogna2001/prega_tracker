import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth, updateProfile } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/database";
const firebaseConfig = {
  apiKey: "AIzaSyBAif6NE39EnVq2HQAELQh6hG3alFIQDwY",
  authDomain: "pregbuddy-76289.firebaseapp.com",
  projectId: "pregbuddy-76289",
  storageBucket: "pregbuddy-76289.appspot.com",
  messagingSenderId: "547697955445",
  appId: "1:547697955445:web:df9c85fcdd81cf67761e3c",
};
const appli = firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();

export const auth = getAuth(appli);

export default appli;
