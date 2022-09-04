import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDVduGdiHxv4JGiOOL0Dhf5J0VUR8W9kOU",
    authDomain: "signal-clone-fc7ca.firebaseapp.com",
    projectId: "signal-clone-fc7ca",
    storageBucket: "signal-clone-fc7ca.appspot.com",
    messagingSenderId: "990212011558",
    appId: "1:990212011558:web:2888f5ab5cce5d94f7d8e7"
  };
  let app;
   if(firebase.apps.length === 0){
       app=firebase.initializeApp(firebaseConfig);
   }else{
       app=firebase.app();
   }
  const db =app.firestore();
  const auth =firebase.auth();
   export { db,auth };