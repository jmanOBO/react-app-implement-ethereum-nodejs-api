import { useState } from "react";
import {Typography, Box, Button } from "@mui/material";

const PrivateKey = ({pkey}) => {

    const [showPriv, setShowPriv]=useState(true);
  return (
    <Box style={{
      display: "flex",
      alignItems:"center",
      justifyContent: "center",
      flexDirection: "column"
    }}>
   

             <Button 
             onClick={()=>setShowPriv(
                !showPriv
             )}
             >{showPriv?`Hide`:`Show `} Private Key</Button>

             {
                showPriv? 
                 <Typography>{pkey}</Typography>:
                 <Typography></Typography>
                  
                  
             }
     

    </Box>
  )
}

export default PrivateKey