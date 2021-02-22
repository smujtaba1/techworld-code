import React from 'react';
import styled,{keyframes} from 'styled-components';
import {HashRouter as Router, Link} from 'react-router-dom';
import powersupplies from '../images/powersupplies.png';
import memoryram from '../images/memoryram.png';
import nvidiageforcegtx1050ti from  '../images/nvidiageforcegtx1050ti.png';
import storagedrives from '../images/storagedrives.png';
import cpus from '../images/cpus.png';
import mice from '../images/mice.png';
import keyboards from '../images/keyboards.png';
import wifiadapters from '../images/wifiadapters.png';

const fadeIn = keyframes`
    0% {opacity:0;}
    100% {opacity:1;}
`;

const HomeComp= styled.div`
    background:#FBFBFB;
    animation:${fadeIn} .5s linear forwards;
    .home-products {
        display:flex;
        flex-wrap:wrap;
        justify-content:center;
        
    }

    .home-products-tile {
        margin:15px;
        background:white;
        min-width:250px;
        max-width:30%;
        display:flex;
        flex-direction:column;
        justify-content:flex-end;
        box-sizing:border-box;
        padding:15px;
        border:solid 1px transparent;

        &:hover {
            border:solid 1px black;
        }


        align-items:center;

        >a {
            display:block;
            
            display:flex;
            flex-direction:column;
            justify-content:flex-end;
        }

        div {
            
            height:430px;
            display:flex;
            align-items:center;
        }

        img {
            width:100%;
            max-height:100%;
            object-fit:contain;
        }

        span {
            text-align:center;
            color:black;
            font-size:18px;
            font-weight:700;
            display:block;
        }
    }
`;

function Home() {

   



    return (
        
        <HomeComp >
            <Router>
                <div className="home-products wrapper">
                    <div className="home-products-tile">
                        <Link to="/powersupplies/1"><div><img alt="power supplies" src={powersupplies}/></div><span>Power Supplies</span></Link>
                    </div>
                    <div className="home-products-tile">
                        <Link to="/graphicscards/1"><div><img alt="graphics cards" src={nvidiageforcegtx1050ti}/></div><span>Graphics Cards</span></Link>
                    </div>
                    <div className="home-products-tile">
                        <Link to="/memoryram/1"><div><img alt="memory or ram" src={memoryram}/></div><span>Memory/RAM</span></Link>
                    </div>
                    <div className="home-products-tile">
                        <Link to="/storage/1"><div><img alt="storage drives" src={storagedrives}/></div><span>Storage Drives</span></Link>
                    </div>
                    <div className="home-products-tile">
                        <Link to="/cpus/1"><div><img alt="cpu's" src={cpus}/></div><span>CPU's</span></Link>
                    </div>
                    <div className="home-products-tile">
                        <Link to="/mice/1"><div><img alt="mice" src={mice}/></div><span>Mice</span></Link>
                    </div>
                    <div className="home-products-tile">
                        <Link to="/keyboards/1"><div><img alt ="keyboards" src={keyboards}/></div><span>Keyboards</span></Link>
                    </div>
                    <div className="home-products-tile">
                        <Link to="/wifi/1"><div><img alt="wifi adapters" src={wifiadapters}/></div><span>Wifi Adapters</span></Link>
                    </div>
                </div>
            </Router>
        </HomeComp>
            

    )
}

export default Home;