import React from 'react';
import './Navbar.scss';


function NavDropButton(props) {

    const numbers = [1, 2, 3];
    const list_items = numbers.map((num, index) =>
        <li className="list-item" key={index} my_key={props.nav_value + num} onClick={click_btn}>{props.nav_value}{num}</li>
    )
    let show_list = false;
    function click_btn(e) {
        console.log(e.target.getAttribute('my_key'))
    }
    if (props.nav_index === props.nav_value) {
        show_list = true;
    } else {
        show_list = false;
    }

    return (
        <li className={'nav-btn unselectable ' + (show_list ? "active" : "")}
            onClick={props.click_navbtn}
            nav_value={props.nav_value}
            nav_index={props.nav_index}
        ><span nav_value={props.nav_value}>{props.nav_value}</span>
            <div className={'droplist '} hidden={show_list ? false : true}>
                <ul>
                    {list_items}
                </ul>
            </div>
        </li>
    )
}


export default NavDropButton;