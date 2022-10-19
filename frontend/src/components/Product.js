import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import Rating from "./Rating";
import axios from "axios";

const Product = ({ product }) => {

	const {state,dispatch:ctxDispatch}=useContext(Store)
	const {cart}=state
	const addToCartHandler=async ()=>{
		const existItem=cart.cartItems.find((x)=>x._id ===product._id)
		const quantity=existItem?existItem.quantity+1:1

		const {data}=await axios.get(`/api/products/${product._id}`)

		if(data.countInStock<quantity){
			window.alert('Sorry. Product is out of stock')
		}

		ctxDispatch({type:'CART_ADD_ITEM',payload:{...product,quantity:1}})
	}


	return (
		<Card key={product.slug} className="product">
			<Link to={`product/${product.slug}`}>
				<img src={product.image} className="card-img-top" alt={product.name} />
			</Link>
			<Card.Body>
				<Link to={`product/${product.slug}`}>
					<Card.Title>{product.name}</Card.Title>
				</Link>
				<Rating
					rating={product.rating}
					numReviews={product.numReviews}
				></Rating>
				<Card.Text>${product.price}</Card.Text>
				<Button onClick={addToCartHandler}>Add to Cart</Button>
			</Card.Body>
		</Card>
	);
};

export default Product;
