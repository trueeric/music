import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCs5SxNPeMIMeps18AvlnxQxypev6Y0wuo',
  authDomain: 'music-95dc8.firebaseapp.com',
  projectId: 'music-95dc8',
  storageBucket: 'music-95dc8.appspot.com',
  messagingSenderId: '791663181064',
  appId: '1:791663181064:web:af4bf13ffc5f41af3fc0bd',
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection('users');

export { auth, db, usersCollection, storage };
