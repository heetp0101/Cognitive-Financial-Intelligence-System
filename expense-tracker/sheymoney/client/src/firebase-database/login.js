import 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
import { message } from "antd";
import { initializeApp } from "firebase/app";
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

  // Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const loggedinUser = async(email, password, navigate)=>{

    try {
      // Define a query to check for existing documents with the same values
      const loginQuery = query(
          collection(db, "users-signup"),
          where("email", "==", email),
          where("password", "==", password)
         // Add more 'where' clauses for additional fields as needed
      );

      
      const loginSnapshot = await getDocs(loginQuery);

      if (loginSnapshot.docs.length > 0 ) {
          // No matching documents found, so we can add the new transaction
            const userData = loginSnapshot.docs[0].data();
            const userName = userData.name;

            try {
                const docRef = await addDoc(collection(db, "users-login"), {
                  email: email,
                  password: password,
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }

            console.log("User Logged in with name: ", userName);
            message.success("Users Logged in Successfully:");
            localStorage.setItem("name", userName);
            navigate(`/home?username=${userName}`);
       
      } else {
          // Matching documents found, preventing the operation
          message.warning("User already logged in.");
          console.log("User already logged in.");
      }
  } catch (error) {
      console.log("Something went wrong", error);
  }
        // try {
        //     const docRef = await addDoc(collection(db, "users-login"), {
        //       email: email,
        //       password: password,
        //     });
        //     console.log("Document written with ID: ", docRef.id);
        //   } catch (e) {
        //     console.error("Error adding document: ", e);
        //   }
};

export { loggedinUser };
