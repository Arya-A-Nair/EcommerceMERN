import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
	return (
		<Card key={product.slug} className="product">
			<Link to={`product/${product.slug}`}>
				<img src={product.image} className="card-img-top" alt={product.name} />
			</Link>
			<Card.Body>
				<Link to={`product/${product.slug}`}>
					<Card.Title>{product.name}</Card.Title>
				</Link>
                <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
				<Card.Text>${product.price}</Card.Text>
				<Button>Add to Cart</Button>
			</Card.Body>
		</Card>
	);
};

export default Product;