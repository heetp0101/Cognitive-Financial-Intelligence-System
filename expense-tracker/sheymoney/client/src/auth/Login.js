// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/app';
import 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
import { message } from 'antd';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { loggedinUser } from '../firebase-database/login';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration



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


const loginUser = async(email, password, navigate)=>{

    signInWithEmailAndPassword(auth,  email, password)
    .then((userCredential) => {
      // Signed in 
      
      console.log("Login Successfull");
      message.success("Login is Successfull");

      
      const loggedinResult =  loggedinUser(email, password, navigate);
      
        if(loggedinResult)
        {
          navigate("/home");
        }
        else
        {
          console.log("Something went wrong");
        }
        
      const user = userCredential.user;
  
      // const dataToSend = name;
      // <DefaultLayout data={dataToSend} />;
      // useEffect( ()=>{
      //   setTimeout( ()=>nav('/'),5000);
      // },[])
      // ...
    })
    .catch((error) => {
      navigate('/login');
      console.log("Login Error");
      message.error("Something is wrong!")
      const errorCode = error.code;
      const errorMessage = error.message;

    });

  }

  export { loginUser };

