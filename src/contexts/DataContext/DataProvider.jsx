import { createContext, useReducer } from "react";

export const DataContext=createContext(null);

const initialState={data: {}};
const reducer=(state,action)=>{
        switch(action.type){
           case "add":
             return {
                data: action.payload
             }
            default:
               return state; 
             
        }
 }
 
 
 const DataProvider = ({children}) => {
    const [state,dispatch]=useReducer(reducer,initialState);
   return (
     <DataContext.Provider value={{state,dispatch}}>
        {children}
     </DataContext.Provider>
   )
 }
 
 export default DataProvider;