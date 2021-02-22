import styled from 'styled-components';
import {HashRouter as Router, Link} from 'react-router-dom';

const Foot= styled.footer`
    background:#2F376A;
    padding:40px 0;
    .footer {
        position:relative;

        @media screen and (max-width: 575px){
            display:flex;
            flex-direction:column-reverse;
            align-items:center;
        }
    }
    
    .footer-table {
        color:white;
        

        a:link,a:visited {
            color:white;
        }

        a:hover {
            text-decoration:underline;
        }

        th {
            font-weight:bold;
            text-align:left;
            font-size:18px;
            text-decoration:underline;
        }
    }

    .footer-logo {
        font-size:32px;
            color:white;
            font-weight:bold;
            margin-bottom:20px;
        @media screen and (min-width: 576px) {
            position:absolute;
            left:50%;
            top:40px;
            transform:translate(-50%,-50%);
            font-size:32px;
            color:white;
            font-weight:bold;
        }

    }
`;


function Footer () {
    return (
        <Foot>
            <div className="footer wrapper">
                <table className="footer-table">
                    <tr><th>Products</th></tr>
                    <tr><td><Link to="/powersupplies/1">Power Supplies</Link></td></tr>
                    <tr><td><Link to="/graphicscards/1">Graphics Cards</Link></td></tr>
                    <tr><td><Link to="/memoryram/1">Memory/Ram</Link></td></tr>
                    <tr><td><Link to="/storage/1">Storage Drives</Link></td></tr>
                    <tr><td><Link to="/cpus/1">CPU's</Link></td></tr>
                    <tr><td><Link to="/mice/1">Mice</Link></td></tr>
                    <tr><td><Link to="/keyboards/1">Keyboards</Link></td></tr>
                    <tr><td><Link to="/wifi/1">Wifi-Adapters</Link></td></tr>
                </table>
                <div className="footer-logo">Tech World</div>
            </div>
            
        </Foot>
    )
}

export default Footer;