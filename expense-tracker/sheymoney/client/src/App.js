import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';
import 'local-storage';
import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Test from './pages/Test';
function App() {


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

  const auth=getAuth(app);
  let flag = false;

  const [IsLoggedIn, setIsLoggedIn] = useState(flag);


  return ( 
      <BrowserRouter>
          <Routes>
            <Route path='/' element={ <Index /> }/>
            <Route path="/login" element={ <Login /> } />
            <Route path="/home" element={<ProtectedRoute> <Home />  </ProtectedRoute>} />
            <Route path='/test' element={<ProtectedRoute>  <Test /> </ProtectedRoute>} />
            <Route path='/register' element={<Register />} />
            {/* <Route path='/authenticated' element={<Authenticated />} */}
            {/* Default route for unauthenticated users */}
            {/* <Route path='/transaction' element={<Transactions username={username}/>}/> */}
          </Routes>
      </BrowserRouter>
  );
}

export function ProtectedRoute(props){
  if(localStorage.getItem("name"))
  {
    return props.children;
  }
  else
  {
    return <Navigate to='/login' />
  }
}

export default App;
