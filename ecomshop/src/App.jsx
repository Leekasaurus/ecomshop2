import { useState,useEffect } from 'react'
import Login from './components/Login'
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import { getAllProducts } from "./components/API";
import Directory from './components/Directory'
import Cart from './components/Cart'
import Home from './components/Home'
import Product from './components/Product';
import Products from './components/Products';
import CategoryItem from './components/CategoryItem';
import './style.css'


function App() {

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [login, setLogin] = useState(false)
    const [cart, setCart] = useState([])
  
    useEffect(() => {
      async function getProducts () {
        try {
          const productsData = await getAllProducts()
          setProducts(productsData)
        } catch (error) {
          console.error('Error fetching products:', error)
        }
      }
      getProducts()
    }, [])
  
  
    const logout = () => {
      setLogin(false)
    }
  
    const addToCart = product => {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  
    console.log(products)
    return (
      <Router>
        <div id='app'>
          <div className='navbar'>
            {login ? (
              <Link to='/account/login'>
                <button className='link' onClick={logout}>
                  Logout
                </button>
              </Link>
            ) : (
              <Link to='/account/login'>Login</Link>
            )}
            <Link to='/cart'>Cart ({cart.length})</Link>
            <Link to='/products'>Products</Link>
            <Link to='/'>Home</Link>
          </div>
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/products'
            element={
              <Products
                products={products}
                cart={cart}
                addToCart={addToCart}
                setProducts={setProducts}
              />
            }
          />
          <Route path='/cart' element={<Cart cart={cart} setCart={setCart} />} />
          <Route
            path='/directory'
            element={<Directory categories={categories} />}
          />
          <Route path='/directory/:id' element={<CategoryItem />} />
          <Route path='/account/login' element={<Login setLogin={setLogin} />} />
          <Route
            path='/products/:id'
            element={<Product addToCart={addToCart} />}
          />
        </Routes>
      </Router>
    )
}
export default App