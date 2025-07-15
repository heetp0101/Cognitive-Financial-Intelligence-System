
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";

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
  let uname;

  auth.onAuthStateChanged(function (user) {
    if (user) {
      userId = user.uid;
      userEmail = user.email;
    }
  });

  const deleteTransaction = async(transaction) => {

    uname = transaction.name;
    console.log(transaction);

    console.log(userEmail);
    // Step 1 Get latest data from local storage 
    let updatedData = JSON.parse(localStorage.getItem("transactionsData"));
     updatedData = Array.isArray(updatedData) ? updatedData : Object.values(updatedData);

  // Array.isArray(oldStorageData) ? oldStorageData : Object.values(oldStorageData);
    console.log(updatedData);

    const collectionName = userEmail+"-"+"transaction";
    console.log("collection name : ",collectionName);
    const transactionsRef = collection(db, collectionName);

    // Step 2 Delete all existing Firestore transactions
    const querySnapshot = await getDocs(transactionsRef);
    const deletePromises = querySnapshot.docs.map(docSnap => deleteDoc(doc(db, collectionName, docSnap.id)));
 
    await Promise.all(deletePromises);
    console.log("All existing transactions deleted from Firestore.");

    // ✅ Step 3: Check if updatedData is empty before inserting
    if (updatedData.length == 0) {
        console.log("No transactions left to insert. Skipping Firestore insertion.");
        return {results}; // Stop function execution
    }
    else
    {
        // Step 4: Insert new transactions from localStorage
        const insertPromises = updatedData.map(transaction => {
          console.log("Transaction being added:", transaction);

          if (typeof transaction !== 'object' || transaction === null) {
              console.error("Invalid transaction format:", transaction);
              return Promise.resolve(); // Skip invalid transactions
          }

          return addDoc(transactionsRef, transaction);
          
      });

      await Promise.all(insertPromises);
      console.log("New transactions added from localStorage.");
    }


    // const collectionRef = collection(db,collectionName);
    // const deletequery = query(collection(db, collectionName), where("amount","==",transaction.amount), where("date","==",transaction.date),
    //                     where("category","==",transaction.category),
    //                     where("reference","==",transaction.reference),
    //                     where("type","==",transaction.type));

    // await deleteDoc(db, collectionName, transaction.id);
    // return {results};    

    // console.log(deletequery);
    // const collectionRef = await collection(db, collectionName);

  
    // console.log("checkpoint 1");
    // console.log(deletequery);
    // const collectionSnapshot = await getDocs(deletequery);
    // // console.log((getDocs(deletequery)).docs[0].id)
    // console.log("checkpoint 2");
    // console.log(collectionSnapshot.docs);
   
    // console.log(collectionSnapshot.docs[0].data());
    // if(collectionSnapshot.docs.length > 0)
    // {

    //   console.log(collectionSnapshot.docs[0].id);
    //   documentId = collectionSnapshot.docs[0].id;
  
    // }
    

    // const docRef =  doc(db, collectionName, documentId);
    // try {
    //   deleteDoc(doc(db,collectionName,documentId));
    //   console.log("Document deleted successfully");
    // } catch (error) {
    //   console.error("Error deleting document:", error);
    // }
    
    // await deleteDoc(collectionSnapshot.docs);
    // console.log(deleteSnapshot.docs.length);
    // if(deleteSnapshot.docs.length > 0)
    // {

    //   console.log(deleteSnapshot.length);

    //   console.log(deleteSnapshot.docs.length);
    //     deleteSnapshot.forEach((doc)=>{
    //       documentId = doc.id;
    //     })
    
    //     console.log(documentId);
        
    //     // deleting document
    //     const documentRef = await doc(db, collectionName, documentId);
    //     await deleteDoc(documentRef);
    // }

      return {results};
  };

export default deleteTransaction;
