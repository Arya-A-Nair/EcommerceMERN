import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import Rating from "./Rating";

const Product = ({ product }) => {

	const {state,dispatch}=useContext(Store)

	const addToCartHandler=()=>{
		dispatch({type:"CART_ADD_ITEM",payload:{...product,quantity:1}})
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
