import { createContext, useReducer } from "react";

export const AuthContext=createContext(null);

const initialState={accessToken: "", persistence: true,};
const reducer=(state,action)=>{
 switch(action.type){
    case "auth":
        return {
          ...state,
            accessToken: action.accessToken,
           
        }
        
    case "log-out":
       return {
         persistence: false,
         accessToken: "",
         
       }
       
    default:
        return state;
 }
 }

const AuthProvider = ({children}) => {
    const [auth,dispatch]=useReducer(reducer,initialState);

  return (
    <AuthContext.Provider value={{auth,dispatch}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;