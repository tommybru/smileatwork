import * as firebase from 'firebase';
import 'firebase/firebase-firestore';

var firebaseConfig = {
  apiKey: "",
  authDomain: "vibes-smileatwork.firebaseapp.com",
  databaseURL: "https://vibes-smileatwork.firebaseio.com",
  projectId: "vibes-smileatwork",
  storageBucket: "vibes-smileatwork.appspot.com",
  messagingSenderId: "593594230818",
  appId: "1:593594230818:web:10a663970dfdb411d0c27b",
  measurementId: "G-KJBCR0E3HX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

export default firestore;
