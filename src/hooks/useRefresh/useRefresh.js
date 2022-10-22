import axios from '../../api/axios';
import useAuth from '../useAuth/useAuth';


const useRefresh = () => {

   const {dispatch}=useAuth();
   
   const refresh=async()=>{
       
    try{
        const response=await axios.get("/refresh-token");
        
        dispatch({type:"auth",accessToken:response.data.newAccessToken});
        console.log(response.data.newAccessToken);
        return response.data.newAccessToken;
        
    }catch(err){
        console.log(err.response?.data);
    }


      

      
  }

  return refresh;
}

export default useRefresh;