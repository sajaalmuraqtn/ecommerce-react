import React, { useEffect } from 'react'
import { PizzaContext } from '../Context/PizzaContext'
import { useContext } from 'react'

export default function Pizza() {
    let {getPizzaContext}=useContext(PizzaContext);
    async function getPizza(){
     const res= await getPizzaContext();
     console.log(res);
    }
 
    useEffect(()=>{
     getPizza();
    },[])
  return (
    <div>Pizza</div>
  )
}
