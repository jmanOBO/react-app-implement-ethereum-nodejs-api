import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AuthProvider from './contexts/AuthContext/AuthProvider';
import DataProvider from './contexts/DataContext/DataProvider';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataProvider>
  <AuthProvider>
    
    <Router>
      <Routes>
        <Route element={<App />} path="/*"/>
       </Routes>
    </Router>
    
    </AuthProvider>
    </DataProvider>
  </React.StrictMode>
);


