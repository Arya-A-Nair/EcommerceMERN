import React from 'react'
import { Link } from 'react-router-dom'
import data from '../data'

function HomeScreen() {
  return (
    <>
        <h1>Featured products</h1>
				<div className="products">
					{data.products.map((product) => (
						<div key={product.slug} className="product">
							<Link to={`product/${product.slug}`}>
								<img src={product.image} alt={product.name} />
							</Link>
							<div className="product-info">
								<p>{product.name}</p>
								<p>
									<strong>${product.price}</strong>
								</p>
								<button>Add to cart</button>
							</div>
						</div>
					))}
				</div>
    </>
  )
}

export default HomeScreen