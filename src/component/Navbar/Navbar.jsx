import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './Navbar.scss';
import NavDropButton from './NavDropButton.jsx';

function Navbar(props) {
    const [nav_index, setNavIdx] = useState('');
    
    function click_navbtn(e){
        let nav_value = e.target.getAttribute("nav_value")
        if (nav_index !== nav_value){
            setNavIdx(nav_value);
            // window.location.href = "/" + nav_value;
        } else {
            setNavIdx('');
        }
    } 
    function click_navdropbtn(e){
        let nav_value = e.target.getAttribute("nav_value")
        if (nav_index !== nav_value){
            setNavIdx(nav_value);
            // window.location.href = "/" + nav_value;

        } else {
            setNavIdx('');
        }
    } 
    const nav_btn_arr = ['Timer', 'LeafletMap'];
    const nav_btn_arr2 = [];

    return (
        <div id="navbar">
            <img className="App-logo" src={logo} alt="logo"></img>
            <ul nav_index={nav_index}>   
                {nav_btn_arr.map(val =>
                    <li key={val} className={'nav-btn unselectable '} onClick={click_navbtn} nav_value={val} >
                        <Link className="nav-link" to={"/"+val}>
                            {val}
                        </Link>
                    </li>)}
                
                {nav_btn_arr2.map(val => 
                    <NavDropButton key={val} nav_value={val} click_navbtn={click_navdropbtn} nav_index={nav_index} />)}
            </ul>
            {/* <input type="file"></input> */}
        </div>
    );
}

export default Navbar;
