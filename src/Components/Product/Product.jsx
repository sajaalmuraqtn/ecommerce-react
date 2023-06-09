import axios from 'axios'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Product() {
  let [products, setProducts] = useState([]);
   let getProducts=async()=>{
    let data = await axios.get('https://king-prawn-app-3mgea.ondigitalocean.app/product');
    setProducts(data.data.products);
    console.log(data.data.products);
  }
  useEffect(
    () => {
      getProducts()
    }, []);

  return (
    <>
          <Helmet>
        <meta charSet="utf-8" />
        <title>t-shop-product</title>
      </Helmet>
    {

 products.length===0?<Loading/>
  :  <div className="container my-5">
      
      {
        products.map((product) => {
           return <Link to={`/product/${product.slug}`} state={{id:product.id}} >
            <div key={product.id} className="card" style={{cursor:'pointer',width: '18rem'}}>
              <img src={product.mainImage.secure_url} width='200px' height='200px' className="card-img-top" alt={product.name} />
              <div className="card-body text-center">
                <hr />
                <h3 className="card-text fw-large text-decoration-none">{product.price} $</h3>
              </div>
            </div>
           </Link>
          }
        )
      }    
      </div>
   }
    </>
  )
}
