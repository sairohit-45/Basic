const firebaseConfig = {
    apiKey: "AIzaSyD1LUD2zR2RPB73JY_ZNX7Ot7AswGyFPy0",
    authDomain: "gallery-9abdb.firebaseapp.com",
    projectId: "gallery-9abdb",
    storageBucket: "gallery-9abdb.firebasestorage.app",
    messagingSenderId: "724509582545",
    appId: "1:724509582545:web:ff2f2457c91080deb1d1f0",
    measurementId: "G-L73WEKXJXW"
  };
  

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
