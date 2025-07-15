import { message } from "antd";
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
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
let userId;
let userEmail; let username; let  dataArray;
//Get User ID from Authenticated User
const auth = getAuth();
const db = getFirestore(app);

auth.onAuthStateChanged(function(user){
    if(user)
    {
        userId = user.uid;
        userEmail = user.email;
        console.log(" transaction User ID : "+userId);
    }   
    else
    {
        console.log("User is not Signed in ");
    }
})




const Transactions = async (values) => {

        // const nameQuery = query(
        //     collection(db, "users-signup"),
        //     where("email","==", userEmail)
        // );

        // //snapshot for nameQuery
        // const nameSnapshot = await getDocs(nameQuery);
        // if(nameSnapshot.size > 0)
        // {
        //     const userData = nameSnapshot.docs[0].data();
        //     username = userData.name;
        // }
        
        // CREATE COLLECTION GROUP TO STORE INDIVIDUAL USERS TRANSACRION
        const collection_name = userEmail+"-"+"transaction";
        console.log(" add transaction in  collection name :",collection_name);
        console.log(" transaction to be added : ",values);

        const docRef = await addDoc(collection(db, collection_name), {
            amount: values.amount,
            type: values.type,
            category: values.category,
            date: values.date,
            reference: values.reference,
            description: values.description,
        });

        console.log("Transaction written with ID: ", docRef.id);
        message.success("Transaction added successfully");

       

    const dataArray = [
        {
            date : values.date,
            amount: values.amount,
            category: values.category,
            reference: values.reference,
            type : values.type,
        }
    ]

    return {dataArray};
};


export default Transactions;

