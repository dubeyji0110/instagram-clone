import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA5oSD_0NUCwnntZREA67kn7m95jF8BuuI",
    authDomain: "instagram-clone0110.firebaseapp.com",
    databaseURL: "https://instagram-clone0110-default-rtdb.firebaseio.com",
    projectId: "instagram-clone0110",
    storageBucket: "instagram-clone0110.appspot.com",
    messagingSenderId: "155522264563",
    appId: "1:155522264563:web:0413771e7303d07d1f7686",
    measurementId: "G-KWCB6B5K0L"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };