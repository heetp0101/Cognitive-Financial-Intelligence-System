import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></link>

// const mongoose = require('mongoose')

// const dbUrl = "mongodb+srv://wizardxp007:wizardxp@cluster0.jp9wfsy.mongodb.net/?retryWrites=true&w=majority"

// const connectionParams = {
//   useNewUrlParser:true,
//   useUnifiesTopology:true
// }

// mongoose.connect(dbUrl, connectionParams).then(()=>{
//   console.info("Connected to the DB");
// }).catch((e)=>{
//   console.log("Error:",e);
// })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
      <App/>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
