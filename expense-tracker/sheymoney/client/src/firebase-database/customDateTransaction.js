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

const db = getFirestore(app);

const auth =getAuth();

const user = auth.currentUser;
let userName; let userEmail, userId;

auth.onAuthStateChanged(function(user){
    if(user)
    {
        userId = user.uid;
        userEmail = user.email;
        
    }   
    else
    {
        // console.log("User is not Signed in ");
    }
})


const customDateTransaction= async(dates)=>{


    const results =[];
    // const currentDate = moment().format("YYYY-MM-DD");

        //get an email from users id
        const nameQuery = query(
            collection(db, "users-signup"),
            where("email","==", userEmail)
        );

        const nameSnapshot = await getDocs(nameQuery);

        if(nameSnapshot.size > 0)
        {
         const userData = nameSnapshot.docs[0].data();   
         userName = userData.name;
        }

        const collection_name = userName+"-"+"transaction";
    const datequery = query(collection(db, collection_name),
                    where("date", ">=", dates[0]),
                    where("date", "<=", dates[1]));

            const collectionSnapshot = await getDocs(datequery);

            collectionSnapshot.docs.forEach((doc)=>{
                
                results.push(doc.data());
            })
            console.log(results);

    return {results};
}

export default customDateTransaction;