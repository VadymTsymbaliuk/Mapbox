import firebase from "firebase/compat";
import 'firebase/firestore'


// Get a Firestore instance
export const db = firebase
    .initializeApp({
        apiKey: "AIzaSyB_4kzFFcr53baoDC79XR5jKnLv6k30ZAk",
        authDomain: "test-vue2-map.firebaseapp.com",
        projectId: "test-vue2-map",
        storageBucket: "test-vue2-map.appspot.com",
        messagingSenderId: "743707623355",
        appId: "1:743707623355:web:cc4cdbcca35f94037d8e9e",
        measurementId: "G-BRMEZ83YBK"
    }).firestore()



