import axios from "axios";
import { createContext, useState } from "react";

export const CartContext=createContext(null);

export function CartContextProvider({children}){
 let [count,setCount]=useState(0);
  async function addToCartContext(productID){
    try {

      const token=localStorage.getItem('userToken');
      let objData={productID};
      const {data}= await axios.post(`https://king-prawn-app-3mgea.ondigitalocean.app/cart/add`,objData,{headers:{authorization:`Tariq__${token}`}})
      return data;
    } catch (error) {
        console.log(error);
    }
  }
  async function getCartContext(){
    try {
         const {data}= await axios.get('https://king-prawn-app-3mgea.ondigitalocean.app/cart',{headers:{Authorization:`Tariq__${localStorage.getItem('userToken')}`}});
         setCount(data.count);
         return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function updateCartContext(productID,quantity){
    try {
      let objData={
        quantity:quantity
      }
         const {data}= await axios.put(`https://king-prawn-app-3mgea.ondigitalocean.app/cart/${productID}`,objData,{headers:{Authorization:`Tariq__${localStorage.getItem('userToken')}`}});
    return data;
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteCartContext(productID){
    try {

         const {data}= await axios.delete(`https://king-prawn-app-3mgea.ondigitalocean.app/cart/${productID}`,{headers:{Authorization:`Tariq__${localStorage.getItem('userToken')}`}});
    return data;
    } catch (error) {
      console.error(error);
    }
  }

    return <CartContext.Provider value={{addToCartContext,getCartContext,updateCartContext,deleteCartContext,count,setCount}}>
        {children}
    </CartContext.Provider>
}