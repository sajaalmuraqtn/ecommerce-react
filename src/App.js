import React, { useEffect, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Product from './Components/Product/Product';
import Register from './Components/Register/Register';
import Notfound from './Components/NotFound/Notfound';
import Login from './Components/Login/Login';
import Cart from './Components/Cart/Cart';
import jwt from 'jwt-decode';
import ProtectedRouter from './Components/ProtectedRouter/ProtectedRouter';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Pizza from './Components/Pizza/Pizza';
import { PizzaContextProvider } from './Components/Context/PizzaContext';
import { CartContextProvider } from './Components/Context/CartStore';

export default function App() {

  let [user, setUser] = useState(null);
  function saveCurrentUser() {
    let token = localStorage.getItem('userToken');
    let decoded = jwt(token);
    setUser(decoded);
  }



  useEffect(
    () => {
      if (localStorage.getItem("userToken")) {
        saveCurrentUser();
      }
    }
    , []
  )

  let router = createBrowserRouter(
    [
      {
        path: '', element: <Layout user={user} setUser={setUser} />,
        children: [
          { index: true, element: <Home /> },
          { path: 'product', element: <Product /> },
          { path: 'product/:id', element: <ProductDetails /> },
          { path: 'pizza', element: <PizzaContextProvider><Pizza /></PizzaContextProvider> },
          { path: 'cart', element: <ProtectedRouter><Cart /> </ProtectedRouter> },
          { path: 'login', element: <Login info={saveCurrentUser} /> },
          { path: 'register', element: <Register /> },
          { path: '*', element: <Notfound /> }
        ]
      }
    ]);
  return (
    <CartContextProvider>

      <RouterProvider router={router}>
      <ToastContainer />

      </RouterProvider>
    </CartContextProvider>
  )
}

