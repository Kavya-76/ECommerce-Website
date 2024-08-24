import React, { useContext, useState, useRef } from 'react';
import './Navbar.css'
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/nav_dropdown.png'


const Navbar = ()=>{
    const [menu, setMenu] = useState("shop");
    // here we have created a useState variable to show the underline to those option on which we have clicked


    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();       // reference variable to hide the navbar when screen size is less
    
    const dropdown_toggle = (e) =>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');   // when we will click on the image it will add the open className to the image and when we will click again it will remove open className from image
    }
    return(
        <div>
            <div className="navbar">
                <div className="nav-logo">
                    <img src={logo} alt="" />
                    <p>SHOPPER</p>
                </div>
                <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
                <ul ref={menuRef} className='nav-menu'>
                    <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/'>Shop{menu==="shop"?<hr/>:<></>}</Link></li>
                    <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration: 'none'}} to='/mens'>Men{menu==="mens"?<hr/>:<></>}</Link></li>
                    <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration: 'none'}} to='/womens'>Women{menu==="womens"?<hr/>:<></>}</Link></li>
                    <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration: 'none'}} to='/kids'>Kids{menu==="kids"?<hr/>:<></>}</Link></li>
                </ul>
                <div className='nav-login-cart'>
                    {localStorage.getItem('auth-token')?
                    <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
                    :<Link to='/login'><button>Login</button></Link>}
                    <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                    <div className="nav-cart-count">{getTotalCartItems()}</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar