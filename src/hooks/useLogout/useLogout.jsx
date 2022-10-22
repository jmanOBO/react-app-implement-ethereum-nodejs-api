import useAuth from "../useAuth/useAuth";
import axios from "../../api/axios";


const useLogout = () => {
  const {dispatch}=useAuth();

  const logOut=async()=>{

    dispatch({type: "log-out"});
    try{
        
        const response=await axios.post("/log-out");
        console.log(response.data);

    }catch(err){
      console.log(err.response?.data);
    }
    
  }



  return logOut;
}

export default useLogout;