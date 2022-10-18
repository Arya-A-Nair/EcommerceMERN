
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
	return (
		<Router>
			<header>
				<a href="/">amazona</a>
			</header>
			<main>
				<Routes>
          <Route path="/product/:slug" element={<ProductScreen/>}/>
					<Route path="/" element={<HomeScreen />} />
				</Routes>
				
			</main>
		</Router>
	);
}

export default App;
