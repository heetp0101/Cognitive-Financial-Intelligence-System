// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/app';
import 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
import { message } from 'antd';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyByA9Jr_gDNp6OkHuSkMhxjTP_x_5SEyGc",
  authDomain: "expense-tracker-a8a57.firebaseapp.com",
  databaseURL: "https://expense-tracker-a8a57-default-rtdb.firebaseio.com",
  projectId: "expense-tracker-a8a57",
  storageBucket: "expense-tracker-a8a57.appspot.com",
  messagingSenderId: "335618173369",
  appId: "1:335618173369:web:38bb527a5f70ccbb71ae68",
  measurementId: "G-VR4651YZW7"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth()

const registerUser = async (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    message.success("Registration Successfull");
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    message.error(`User ${email} has already registered `);
    console.log(`Error : ${error} error message : ${error.message}`);
    // ..
  });
  };

const loginUser = async(email, password)=>{
  const myemail = email;
  const mypassword = password;
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
 
    message.success("Login Successfull");
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    message.error("Login Error!")
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

export { loginUser, registerUser };

