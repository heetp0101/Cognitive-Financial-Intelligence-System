import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { getAuth } from "firebase/auth";
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
let userId;
let userEmail; let username; let  results=[];
//Get User ID from Authenticated User
const auth = getAuth();

const db = getFirestore(app);


auth.onAuthStateChanged(function(user){
    if(user)
    {
        userId = user.uid;
        userEmail = user.email;
        
    }   
})

const FetchUserTransactions= async(userEmail) => {
        results=[];
        //get an email from users id
        const nameQuery = query(
            collection(db, "users-signup"),
            where("email","==", userEmail)
        );

        //snapshot for nameQuery
        const nameSnapshot = await getDocs(nameQuery);
        if(nameSnapshot.size > 0)
        {
            const userData = nameSnapshot.docs[0].data();
            username = userData.name;

        //name the collection
        const collection_name=userEmail+"-"+"transaction";
        console.log(" collection name in fetch user transaction : ", collection_name);
         // Check if the collection exists
         const collectionRef = await collection(db, collection_name);
        //  const collectionExists = await collectionExists(collectionRef);
        const collectionSnapshot = await getDocs(collectionRef);

        console.log("Collection sanpshot size = ", collectionSnapshot.size);
        
        if(collectionSnapshot.size > 0 && results.length < collectionSnapshot.size)
        {
            collectionSnapshot.forEach((doc)=>{
                results.push(doc.data());
            })
        }

        console.log("results array size after pushing data = ", results.length);
        }
        return {results};

};
export default FetchUserTransactions;

