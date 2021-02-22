import styled, { createGlobalStyle } from 'styled-components';
import downarrow from '../images/downarrow.svg';
import shoppingcart from '../images/shoppingcart.svg';
import searchglass from '../images/searchglass.svg';
import {useState, useContext, createContext} from 'react';
import {Link, HashRouter as Router} from 'react-router-dom';
import { MainContext } from '../App';
import globe from '../images/globe.svg';

const Banner = styled.div`
    
    position:sticky;
    top:0;
    background:white;
    z-index:1;
    .banner-1 {
        
        
        display:flex;
       
        justify-content:space-between;
        padding:19px 0 13px;
    }

    .banner-1-logo {
        font-size:24px;
        font-weight:bold;
        line-height:22px;

        @media screen and (max-width: 575px) {
            font-size:16px;
        }

        >img {
            max-height:20px;
        }
    }

    .banner-1-logo:visited {
        color:black;
    }

    .banner-1-nav {
        display:flex;
        align-items:center;
    }

    .banner-1-nav-list {
        position:relative;
        display:flex;
        
    }

    .banner-1-nav-list-dropdown {
        display:none;
        position:absolute;
        background:white;
        top:100%;
        z-index:1;
        width:130px;
        font-size:16px;
        box-shadow:2px 2px 30px black;
        >li {
            
            

            >a:link, >a:visited {
                padding:5px 5px;
                color:#2F376A;
                background:white;
                box-sizing:border-box;
                display:block;

                :hover {
                    color:white;
                    background:#2F376A;
                }
            }

             
        }
    }

    .banner-1-nav-list-menu {
       position:relative;
       cursor:pointer;
       font-size:24px;
       @media screen and (max-width: 575px) {
        font-size:16px;
    }
    }

    

    .banner-1-nav-list-menu-arrow {
        margin-left:5px;
        height:8px;
    }

    .banner-1-nav-list-menu:hover > .banner-1-nav-list-dropdown {
        display:block;
    }

    .banner-1-nav-list-dropdown:hover {
        display:block;
    }

    .banner-2 {
       background:#2F376A;
       padding:8px 0;
    }

    .banner-2-wrapper {
        display:flex;
        
        color:white;
        justify-content:flex-end;
    }




    .banner-2-nav {
        display:flex;
        align-items:center;
        
        >a {
            
            position:relative;
            

            >div {
                color:white;
                position:absolute;
                top:30%;
                left:60%;
                background:red;
                border-radius:50%;
                font-size:16px;
                text-align:center;
                padding:4px;
                
            }
        }
    }

    

    

    

    
   
    
`;


function Navbar() {

    let cartCount = useContext(MainContext);

  
    return (
        <Banner>
            <Router>
                <div className="banner wrapper">
                    <div className="banner-1" >
                        <Link to="/" className="banner-1-logo">TECH <img alt="globe logo" src={globe}/> WORLD</Link>
                        <nav className="banner-1-nav">
                            <ul className="banner-1-nav-list">
                                <li className="banner-1-nav-list-menu">
                                Products<img alt="menu down arrow" className="banner-1-nav-list-menu-arrow" src={downarrow}/>
                                    <ul className="banner-1-nav-list-dropdown">
                                        <li><Link to="/powersupplies/1">Power Supplies</Link></li>
                                        <li><Link to="/graphicscards/1">Graphics Cards</Link></li>
                                        <li><Link to="/memoryram/1">Memory/RAM</Link></li>
                                        <li><Link to="/storage/1">Storage Drives</Link></li>
                                        <li><Link to="/cpus/1">CPU's</Link></li>
                                        <li><Link to="/mice/1">Mice</Link></li>
                                        <li><Link to="/keyboards/1">Keyboards</Link></li>
                                        <li><Link to="/wifi/1">Wifi Adapters</Link></li>
                                    </ul>
                                </li>
                                
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="banner-2">
                    <div className="wrapper banner-2-wrapper">
                        
                        <nav className="banner-2-nav">
                                <Link to="/shoppingcart"><img alt="shopping cart" src={shoppingcart}/><div>{cartCount.cartState.length}</div></Link>
                        </nav>
                    </div>
                </div>
            
            </Router>
        </Banner>
    )
}


export default Navbar;