import React, { useEffect, useReducer} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const reducer =(state,action)=>{
	switch(action.type){
		case 'FETCH_REQUEST':
			return {...state,loading:true}
		case 'FETCH_SUCCESS':
			return {...state,products:action.payload,loading:false}
		case 'FETCH_FAIL':
			return {...state,loading:false,error:action.payload}
		default:
			return state
	}
}

function HomeScreen() {

	const [{loading,error,products},dispatch]=useReducer(reducer,{
		loading:true,
		products:[],
		error:''
	})

	// const [products,setProducts]=useState([])

	useEffect(()=>{
		dispatch({type:'FETCH_REQUEST'});
		axios.get('/api/products')
		.then((res)=>{
			dispatch({type:'FETCH_SUCCESS',payload:res.data})
		})
		.catch(err=>{
			dispatch({type:'FETCH_FAIL',payload:err.message})
		})
	},[])

  return (
    <>
        <h1>Featured products</h1>
				<div className="products">
					{products.map((product) => (
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