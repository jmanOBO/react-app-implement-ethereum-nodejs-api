import web3 from "web3";


const useEthBalance = () => {
    const Web3=new web3();
    

    const getEthBalance=async(provider,walletAddr)=>{
      
      try{
        
        Web3.setProvider(provider);
        const weiBal=await Web3.eth.getBalance(walletAddr);
        const ethBal=Web3.utils.fromWei(weiBal);
        return ethBal;
        

      }catch(err){
        console.log(err);
      }
    }

  return getEthBalance;
  
}

export default useEthBalance