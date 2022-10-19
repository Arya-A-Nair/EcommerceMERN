import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import axios from "axios";
import { Row, Col, ListGroup, ListGroupItem, Card, Badge, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import {Helmet} from 'react-helmet-async'
const reducer = (state, action) => {
	switch (action.type) {
		case "FETCH_REQUEST":
			return { ...state, loading: true };
		case "FETCH_SUCCESS":
			return { ...state, product: action.payload, loading: false };
		case "FETCH_FAIL":
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};
const ProductScreen = () => {
	const param = useParams();
	const { slug } = param;
	console.log(slug);
	const [{ loading, error, product }, dispatch] = useReducer(reducer, {
		loading: true,
		product: [],
		error: "",
	});

	useEffect(() => {
		dispatch({ type: "FETCH_REQUEST" });
		axios
			.get(`/api/products/slug/${slug}`)
			.then((res) => {
				dispatch({ type: "FETCH_SUCCESS", payload: res.data });
			})
			.catch((err) => {
				dispatch({ type: "FETCH_FAIL", payload: err.message });
			});
	}, [slug]);

	return loading ? (
		<div>Loading...</div>
	) : error ? (
		<div>{error}</div>
	) : (
		<div>
			<Row>
				<Col md={6}>
					<img
						className="img-large"
						alt={product.name}
						src={product.image}
					></img>
				</Col>
				<Col md={3}>
					<ListGroup variant="flush">
						<ListGroup.Item>
            <Helmet>

							<title>{product.name}</title>
            </Helmet>
						</ListGroup.Item>
						<ListGroup.Item>
							<Rating
								rating={product.rating}
								numReviews={product.numReviews}
							></Rating>
						</ListGroup.Item>
						<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
						<ListGroup.Item>
							Description: <p>{product.description}</p>
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price: </Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status: </Col>
                    <Col>{product.countInStock>0?<Badge bg="success">Success</Badge>:(<Badge bg="danger">Unvailable</Badge>)}</Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock>0 &&(
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button variant="primary">
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
			</Row>
		</div>
	);
};

export default ProductScreen;
