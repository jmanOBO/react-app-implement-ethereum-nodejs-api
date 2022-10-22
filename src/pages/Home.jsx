import { Box, CircularProgress, Divider, styled, Typography} from "@mui/material";
import { useEffect, useRef } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate/useAxiosPrivate";

import useData from "../hooks/useData/useData";
import PrivateKey from "../components/PrivateKey";
import useEthBalance from "../hooks/useEthBalance/useEthBalance";
import { useState } from "react";


const HomeBox = styled(Box)(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",
  flex: 4,
  [theme.breakpoints.down("md")]: {
    flex: 1,
  },
}));

const Home = () => {
  const INFURA_API_ID="Your ID goes here";
  const PROVIDER=`https://mainnet.infura.io/v3/${INFURA_API_ID}`;
  const getEthBalance=useEthBalance();
  const axiosPrivate=useAxiosPrivate();

  const {state,dispatch } = useData();
  const isMounted = useRef(false);
  const [isloading, setIsLoading]=useState(true);
  const [walletBalance, setWalletBalance]=useState(null);
  

  useEffect(() => {
    
    const fetchDetails = async () => {
      try {
        
        const response = await axiosPrivate.get("/user");
        
        dispatch({ type: "add", payload: response.data });
          
        const bal=await getEthBalance(PROVIDER,response.data.wallet.eth_address)
        setWalletBalance(bal);

        
      } catch (err) {
        console.log("error",err.response?.data);
      }
      finally{
        setIsLoading(false);
      }
    };
    if (isMounted.current===false) {
      
      document.title = "Home...";
      fetchDetails();

      return () => {
        isMounted.current = true;
        
      };
    }
  }, [dispatch, axiosPrivate, getEthBalance]);

  return (

    isloading?
      <CircularProgress/>:

    <HomeBox>
      <PrivateKey pkey={state.data.wallet?.private_key}/>
         
       

      <Divider/>
       
      <Typography>
      Account Balance: {walletBalance}
      </Typography>

    
    </HomeBox>
  );
};

export default Home;
