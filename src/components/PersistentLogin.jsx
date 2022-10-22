import useAuth from "../hooks/useAuth/useAuth";
import useRefresh from "../hooks/useRefresh/useRefresh";
import { useState,useEffect  } from "react";
import { Outlet } from "react-router-dom";

const PersistentLogin = () => {
    const [isLoading,setIsLoading]=useState(true);
    const {auth}=useAuth();
    const refresh=useRefresh();

    useEffect(()=>{
        
        const waitForToken=async()=>{
            try{
              await refresh();
            }catch(err){
              console.log(err);
            }
            finally{
              setIsLoading(false);
            }
        }

      (!auth?.accessToken && auth?.persistence)? waitForToken():setIsLoading(false);

        
    },[auth,refresh]);


    
  return (
    isLoading?
       (<p>Loading...</p>):
    <Outlet/> 
  )
}

export default PersistentLogin