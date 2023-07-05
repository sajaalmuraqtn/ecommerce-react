import axios from "axios";
import { createContext, useContext } from "react";


export const PizzaContext=createContext(null);
export function PizzaContextProvider({children}) {

    async function getPizzaContext(){
        try {
            let {data}= await axios.get('https://forkify-api.herokuapp.com/api/search?q=pizza');
            return data;
            
        } catch (error) {
            console.log(error);
        }
    }
      return<PizzaContext.Provider value={{getPizzaContext}}>
          {children}
      </PizzaContext.Provider>
    return 
}
