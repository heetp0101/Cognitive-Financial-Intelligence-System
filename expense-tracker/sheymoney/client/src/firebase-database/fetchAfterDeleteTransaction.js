import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    // Your Firebase configuration
    apiKey: "AIzaSyByA9Jr_gDNp6OkHuSkMhxjTP_x_5SEyGc",
    authDomain: "expense-tracker-a8a57.firebaseapp.com",
    databaseURL: "https://expense-tracker-a8a57-default-rtdb.firebaseio.com",
    projectId: "expense-tracker-a8a57",
    storageBucket: "expense-tracker-a8a57.appspot.com",
    messagingSenderId: "335618173369",
    appId: "1:335618173369:web:38bb527a5f70ccbb71ae68",
    measurementId: "G-VR4651YZW7"
  };
  
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getFirestore(app);
  let results=[];
  
const fetchAfterDeleteTransaction = async(username)=>{

    results=[];
    const collectionName = username + "-" + "transaction";

    const collectionSnapshot = await getDocs(collection(db, collectionName));
    collectionSnapshot.forEach((doc)=>{
        console.log(doc.data());
    })
    // console.log(results);

}

export default fetchAfterDeleteTransaction;