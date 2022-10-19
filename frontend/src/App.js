import "./App.css";
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import { Badge, CarouselItem, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Store } from "./Store";
import CartScreen from "./screens/CartScreen";

function App() {

	const {state}=useContext(Store)
	const {cart}=state

	return (
		<Router>
		<div className="d-flex flex-column">

			<header>
				<Navbar bg="dark" variant="dark">
					<Container>
						<LinkContainer to="/">
							<Navbar.Brand>amazona</Navbar.Brand>
						</LinkContainer>
						<Nav className="me-auto">
							<Link to="/cart" className="nav-link">
								Cart{
									cart.cartItems.length>0 &&(
										<Badge pill bg="danger">
											{cart.cartItems.length}
										</Badge>
									)
								}
							</Link>
						</Nav>
					</Container>
				</Navbar>
			</header>
			<main>
				<Container className='mt-3'>
					<Routes>
						<Route path="/product/:slug" element={<ProductScreen />} />
						<Route path="/" element={<HomeScreen />} />
						<Route path='/cart' element={<CartScreen/>}/>
					</Routes>

				</Container>
			</main>
		</div>
		</Router>
	);
}

export default App;
