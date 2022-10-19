import React, { useEffect, useReducer } from "react";
import Product from "../components/Product";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import {Helmet} from 'react-helmet-async'

const reducer = (state, action) => {
	switch (action.type) {
		case "FETCH_REQUEST":
			return { ...state, loading: true };
		case "FETCH_SUCCESS":
			return { ...state, products: action.payload, loading: false };
		case "FETCH_FAIL":
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

function HomeScreen() {
	const [{ loading, error, products }, dispatch] = useReducer(reducer, {
		loading: true,
		products: [],
		error: "",
	});

	// const [products,setProducts]=useState([])

	useEffect(() => {
		dispatch({ type: "FETCH_REQUEST" });
		axios
			.get("/api/products")
			.then((res) => {
				dispatch({ type: "FETCH_SUCCESS", payload: res.data });
			})
			.catch((err) => {
				dispatch({ type: "FETCH_FAIL", payload: err.message });
			});
	}, []);

	return (
		<>
		<Helmet>

			<title>Amazona</title>
		</Helmet>
			<h1>Featured Products</h1>
			<div className="products">
				{loading ? (
					<div>Loading...</div>
				) : error ? (
					<div>{error}</div>
				) : (
					<Row>
						{products.map((product) => (
							<Col key={product.slug} sm={6} md={4} lg={3}>
								<Product product={product}></Product>
							</Col>
						))}
					</Row>
				)}
			</div>
		</>
	);
}

export default HomeScreen;
