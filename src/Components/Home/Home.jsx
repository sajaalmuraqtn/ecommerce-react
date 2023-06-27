import React from 'react'
import Category from '../Category/Category';
import { Helmet } from "react-helmet";

export default function Home() {

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>t-shop</title>
      </Helmet>
      <Category />
    </>
  )
}
