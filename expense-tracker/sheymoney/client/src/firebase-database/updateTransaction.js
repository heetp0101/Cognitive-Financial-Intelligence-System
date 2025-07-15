import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";

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


  let userId, userEmail;
  let documentId;
  let results=[];

  auth.onAuthStateChanged(function (user) {
    if (user) {
      userId = user.uid;
      userEmail = user.email;
    }
  });

  

  const updateTransaction = async(oldtransaction, newtransaction) => {
    results = [];
    // Function to update Firestore document

    const collectionName = userEmail+ "-" + "transaction";

    const oldcolquery = query(
      collection(db, collectionName),
      where("amount", "==", oldtransaction.amount),
      where("date", "==", oldtransaction.date),
      where("category", "==", oldtransaction.category),
      where("type", "==", oldtransaction.type),
      where("reference", "==", oldtransaction.reference)
    );

    const oldquerysnapshot = await getDocs(oldcolquery);

    (await oldquerysnapshot).forEach((doc) => {
      documentId = doc.id;
      console.log(`Document ID: ${documentId}`);
    });


    const docRef = doc(db, collectionName, documentId);
    
    console.log("Old Transaction : ",oldtransaction);
    console.log("New Transaction :",newtransaction);



    try {
      // Remove undefined fields
      const filteredData = Object.fromEntries(
        Object.entries(newtransaction).filter(([_, value]) => value !== undefined)
      );
  
      // Ensure there's something to update
      if (Object.keys(filteredData).length === 0) {
        console.log("No valid fields to update.");
        return;
      }

            //  Update the document with new data
        await updateDoc(docRef, filteredData);
  
  
      console.log("Record updated successfully!", filteredData);
    } catch (error) {
      console.error("Error updating document:", error);
    }




    //Retrieve all data
    const collectionRef = await collection(db, collectionName);

    const collectionSnapshot = await getDocs(collectionRef);

    collectionSnapshot.forEach((doc)=>{
        results.push(doc.data());
    })

    return {results};    
  };

export default updateTransaction;
