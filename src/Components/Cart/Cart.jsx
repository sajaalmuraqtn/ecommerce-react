import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/CartStore'
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

export default function Cart() {
  let {getCartContext}=useContext(CartContext);
  let {updateCartContext}=useContext(CartContext);
  let {deleteCartContext}=useContext(CartContext);
  let [cart,setCart]=useState([]);
  async function getCart(){
    let res = await getCartContext();
    if (res.message==='success') {  
      setCart(res.cart.cartItems);
      console.log(res.cart);
    }

  }
  async function updateCartQuantity(productId,e){
    let res = await updateCartContext(productId,e.target.value);

    getCart();

  }
  async function deleteCart(productId){
    let res = await deleteCartContext(productId);
    if (res.message==='Done') {
      toast("product deleted successfully")
      getCart();
     }else{
      toast('product has a problem with deleted');
     }

  }
  useEffect(()=>{
    getCart();
  },[])
  return (
    <>
       <Helmet>
        <meta charSet="utf-8" />
        <title>t-shop-Cart</title>
      </Helmet>
        <h2 className='my-2'>Cart</h2>
      <table class="table my-5">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">After disCount</th>
      <th scope="col">Quantity</th>
      <th scope="col">Final Price</th>
      <th scope="col">delete </th>
    </tr>
  </thead>
  <tbody>{
    cart.map(
      (product)=>{

    return <tr>
      <th scope="row">1</th>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.discount}</td>
      <td>{product.quantity}
        <select name="quantity" onChange={(e)=>updateCartQuantity(product.productId._id,e)} id="">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </td>
      <td>{product.finalPrice*product.quantity}</td>
      <td><button className='btn btn-danger' onClick={()=>deleteCart(product._id)}>X</button></td>

    </tr>}
    )
  }
    
  </tbody>
</table>
    
    </>
  )
}
