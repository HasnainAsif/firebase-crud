import firebase from "firebase/app";
// import * as firebase from "firebase";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyBO3hFTJVsV6lmgVFrzsqP6z7FyCbxF65M",
  authDomain: "react-crud-3dded.firebaseapp.com",
  databaseURL: "https://react-crud-3dded-default-rtdb.firebaseio.com",
  projectId: "react-crud-3dded",
  storageBucket: "react-crud-3dded.appspot.com",
  messagingSenderId: "42653924260",
  appId: "1:42653924260:web:3891fc0b67eeada6869f31",
};
// Initialize Firebase
let fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
