import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'

export default function ProductDetails() {
 let[subProduct,setSubProduct]=useState({});
  let {id} =useParams();
 async function getSubProduct() {
    let data=await axios.get(`https://king-prawn-app-3mgea.ondigitalocean.app/product/${id}`);
    setSubProduct(data.product);
  }
  useEffect(
    ()=>{
      getSubProduct();
    },[]
  );
  return (
    <>
    <div>
      <h1>ProductDetails</h1>
      {id}
    </div>
      
    </>
  )
}
