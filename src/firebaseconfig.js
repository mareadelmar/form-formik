import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBoriWn6R-vXri47NUdpNSmzAppmMqtRo4",
    authDomain: "form-udemy.firebaseapp.com",
    projectId: "form-udemy",
    storageBucket: "form-udemy.appspot.com",
    messagingSenderId: "430579274232",
    appId: "1:430579274232:web:a02f16eca30ad4abe6c60d",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

// exportamos el auth para usarlo así directamente (sin tener que inicializarlo cada vez que lo usemos)
const auth = fire.auth();
export { auth };
