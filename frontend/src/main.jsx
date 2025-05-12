// import { React } from 'react'
// import { ReactDOM  } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// ReactDOM(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ default import
import './index.css';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root')); // ✅ correct usage
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
