import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import axios from "axios";
import { Row, Col, ListGroup,Card, Badge, Button } from "react-bootstrap";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import {Helmet} from 'react-helmet-async'
import LoadingBox from "../components/LoadingBox";
import { Store } from "../Store";
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


	const param = useParams();
	const { slug } = param;
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
		<LoadingBox/>
	) : error ? (
		<MessageBox variant="danger">Page not found</MessageBox>
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
                      <Button variant="primary" onClick={addToCartHandler}>
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
