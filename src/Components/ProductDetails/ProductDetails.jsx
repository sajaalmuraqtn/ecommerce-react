import axios from 'axios';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import Loading from '../Loading/Loading';
import { CartContext } from '../Context/CartStore';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
  let [subProduct, setSubProduct] = useState({});
  let [subImage, setSubImage] = useState([]);
 //let { id } = useParams();
  async function getSubProduct() {
    let data = await axios.get(`https://king-prawn-app-3mgea.ondigitalocean.app/product/${id}`);
    setSubProduct(data.data.product);
   console.log(data.data.product); 
    setSubImage(data.data.product.subImages );
  }
  const {addToCartContext}=useContext(CartContext);

  async function addToCart(productId){

    const res = await addToCartContext(productId);
     if (res.message==='success') {
      toast("product added successfully")
     }else{
      toast('product has a problem with added');
     }
    console.log(res);
  }
  
  const location=useLocation();
  let {id}=location.state;


  useEffect(
    () => {
      getSubProduct();
    }, []
  );
  return (
    <>
       <Helmet>
        <meta charSet="utf-8" />
        <title>t-shop-product</title>
      </Helmet>
    <div className='container my-5 text-start'>
       {
         subImage.length === 0 ?<Loading/>:
       <div>
        <h1>{subProduct.name}</h1>

        <div className="container   row my-5">
          {
            subImage.map((ele)=>{
              return <img src={ ele.secure_url} height='200px'  width='200px' className=" rounded col-md-3" alt={subProduct.name} />
            })
          }
          <button className='btn btn-success mt-5 col-md-4' onClick={()=>addToCart(subProduct._id)} > Add To Cart</button>
          
        </div>
              </div>

}

    </div>
</>
  )
}
