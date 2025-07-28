import React, { useEffect, useState } from 'react'
import Home from './pages/Home'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { CartProvider } from './pages/CartContext';
import Contact from './pages/Contact';
import Items from './pages/Items';
import Cart from './pages/Cart';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import Navbar from './components/Navbar';

const ScrollToTop = () => {
  const {pathname} = useLocation();  //just extracting the pathname using destructuring (gets current route path)
  useEffect(() => {                  //useEffect is used to perform side effect when something changes- in this case when pathname changes
    window.scrollTo({ top: 0, behavior: 'smooth' }); //runs the scroll logic when path changes
  },[pathname])
  return null                        //null because component does not render anything visually
}


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('authToken'))
  )

  useEffect(() => {
    const handler = () => {
      // Check if authToken is in localStorage, and update state based on that
      setIsAuthenticated(Boolean(localStorage.getItem('authToken')))    //this snippet consists of a function that checks if the user is authenticated or not   
    }
    // Listen for custom "authStateChanged" events (triggered during login/logout)
    window.addEventListener('authStateChanged', handler) //manually dispatches this event elsewhere in your code when the *user logs in and the *user logs out
    // Clean up the listener when component unmounts
    return () => window.removeEventListener('authStateChanged', handler) //this removes the listener when the component unmounts (best practice to prevent memory leaks or duplicate listeners)
  }, [])

  return (
    <CartProvider>
      <ScrollToTop />   {/**used here so that it listens to route changes and always scrolls you to top */}
      <Navbar isAuthenticated={isAuthenticated}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/items' element={<Items/>} />
        <Route path='/cart' element={isAuthenticated ? <Cart/> : <Navigate replace to='/login'/>} />  {/**Protected Route */}

        {/**Auth Routes */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/logout' element={<Logout/>}/>

        {/**Fallback to home (if no route matches) */}
        <Route path='*' element={<Navigate replace to='/' />}/>
      </Routes>
    </CartProvider>
  )
}

export default App
