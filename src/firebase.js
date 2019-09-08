// firebase.js
import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
    apiKey: "AIzaSyAWXJx11fUtJwt_51MUduy1gXL-14MSu2c",
    authDomain: "pwa-tutorial-45a21.firebaseapp.com",
    databaseURL: "https://pwa-tutorial-45a21.firebaseio.com",
    projectId: "pwa-tutorial-45a21",
    storageBucket: "pwa-tutorial-45a21.appspot.com",
    messagingSenderId: "559202931444",
    appId: "1:559202931444:web:96019c1d53eaef49ad04a1"
});

export const db = firebaseApp.firestore();