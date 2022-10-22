import useRefresh from '../useRefresh/useRefresh';
import {useEffect} from 'react';
import { axiosPrivate } from '../../api/axios';
import useAuth from '../useAuth/useAuth';

const useAxiosPrivate = () => {
   
    const {auth}=useAuth();
    const refresh=useRefresh();

  useEffect(()=>{
  
    const requestintercept=axiosPrivate.interceptors.request.use(
      config=>{
        if(!config.headers["Authorization"]){
            config.headers["Authorization"]=`Bearer ${auth?.accessToken}`;
            
        }
        return config;
        
      },
      error=>  Promise.reject(error)

    );

    const responseintercept=axiosPrivate.interceptors.response.use(
        response=>response,
        async(error)=>{
            let prevRequest=error?.config;
            if(!prevRequest.sent && error?.response?.status===403){
                
                prevRequest.sent=true;
                const accToken=await refresh();
                prevRequest.headers["Authorization"]=`Bearer ${accToken}`;
                return axiosPrivate(prevRequest);
            }
            return Promise.reject(error)
        }
    );


   return ()=>{
    axiosPrivate.interceptors.request.eject(requestintercept);
    axiosPrivate.interceptors.response.eject(responseintercept);
   }
  },[auth,refresh]);

  return axiosPrivate;
}

export default useAxiosPrivate