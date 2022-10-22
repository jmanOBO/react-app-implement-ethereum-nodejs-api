
import Home from './pages/Home';
import { useState } from 'react';
import {Routes,Route} from "react-router-dom";
import Layout from './components/Layout';
import  Login  from './pages/Login';
import Profile from './pages/Profile';
import Request from './pages/Request';
import Send from './pages/Send';
import Register from './pages/Register';
import RequireAuth from './components/RequireAuth';
import PersistentLogin from './components/PersistentLogin';

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen]=useState(false);
  return (
    <Routes>
     <Route element={<PersistentLogin/>}>
      <Route element={<RequireAuth/>}>
        <Route element={<Layout isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}/>} >
           <Route path="/" element={<Home/>}/>
           <Route path="/profile" element={<Profile/>}/>
           <Route path="/request" element={<Request/>}/>
           <Route path="/send" element={<Send/>}/>
          
        </Route>
      </Route>
     </Route>

        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      
    </Routes>
   
  )
}

export default App