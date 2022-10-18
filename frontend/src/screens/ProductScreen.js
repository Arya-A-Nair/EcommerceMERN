import React from 'react'
import { useParams } from 'react-router-dom'

const ProductScreen = () => {

    const param=useParams();
    const {slug}=param
    console.log(slug)

  return (
    <div>{slug}</div>
  )
}

export default ProductScreen