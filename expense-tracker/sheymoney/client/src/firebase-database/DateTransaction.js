import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";


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

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const DateTransaction = async()=>{

    const dateTransactionQuery = query(
        collection(db, "user-transaction"),
        where("date", "<", "2023-04-07"),
    )

    const dateSnapshot = await getDocs(dateTransactionQuery);
    const myArray = [];
    // Create an array to store the data
    const dataArray = dateSnapshot.docs.map(doc => doc.data());
    if(Array.isArray(dataArray))
    {
        console.log(" this is array");
    }
    else
    {
        console.log("this is not an array");
    }
    return dataArray;
}

export default DateTransaction;