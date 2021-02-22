import styled,{keyframes} from 'styled-components';
import {useContext} from 'react';
import {MainContext} from '../App.js';
import {Link} from 'react-router-dom';

const fadeIn = keyframes`
    0% {opacity:0;}
    100% {opacity:1;}
`;

const Cart= styled.div`

    animation:${fadeIn} .8s linear forwards;
    .cart-title {
        margin:40px 0;
        text-align:center;
    }    

    .item {
        display:grid;
        grid-template-columns:repeat(3,auto);
        width:100%;
        max-width:720px;
        margin:10px auto;
        padding:20px;
        box-sizing:border-box;
        border: 1px solid black;
        @media screen and (max-width: 575px) {
            grid-template-columns:1fr;
        }
    }

    .item-container {
        padding:15px;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
    }

    .item-container-image{
        height:100px;
        max-width:100px;
        object-fit:contain;
    }

    .item-container-brand {
        font-size:18px;
        font-weight:bold;
    }

    .item-container-filters {
        >div {
            
        }
    }

    .item-quantity {
        
        display:flex;
        justify-content:center;
        align-items:center;
        font-size:20px;
    }

    .item-container-pq {
        padding:15px;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        
        .item-container-pq-totalPrice {
            font-weight:bold;
            margin-bottom:10px;
        }

        button {
            display:block;
            margin:2px 0;
            padding:5px;

            &:nth-child(2){
                background:red;
            }

            &:nth-child(3) {
                background:orange;
            }
        }
    }

    .empty-message {
        font-size:24px;
        margin:80px 0;
        text-align:center;
        >a {
            &:link,&:visited {
                color:black;
                text-decoration:underline;
                font-weight:bold;
            }
            &:hover {
    
            }
        }
        
    }

    .finalTotal {
        display:flex;
        justify-content:center;
        width:100%;
        max-width:720px;
        margin:10px auto 40px;
        padding:20px;
        box-sizing:border-box;
        border: 1px solid black;
        @media screen and (max-width: 575px) {
            grid-template-columns:1fr;
        }
    }
`;


export function ShoppingCart() {

    const cartContext=useContext(MainContext);
    
  

    function getTotalPrice (obj) {
        return (obj.price*obj.quantity).toFixed(2); 
    }

    function removeItem(obj) {
        cartContext.cartDispatch({type:"remove",data:obj});
    }

    function calculateTotal() {
        let myTotal=[...cartContext.cartState].reduce((total,item)=>
            {
                let tot=item.quantity.toFixed(2)*item.price.toFixed(2)
                return total + tot
            },0
        )
        return myTotal
    }

    return (
        <Cart className="wrapper">
            <h1 className="cart-title">Your Cart</h1>
            <div className="main-items">
                {cartContext.cartState.length===0 && 
                <div className="empty-message">Cart's looking a little slim there. <Link to="/">Check out our products</Link> and buy something!</div>
                }
                {cartContext.cartState.map((item,index)=>
                    <div className="item" key={index}>
                        <div className="item-container">
                            <img alt="item" className="item-container-image" src={item.image}/>
                            <div className="item-container-brand">{item.brand}</div>
                            <div className="item-container-model">{item.model}</div>
                            <div className="item-container-filters">{item.filters}</div>
                            <div className="item-container-price">{`Price: ${item.price.toFixed(2)}`}</div>
                        </div>
                        <div className="item-quantity">{`x ${item.quantity}`}</div>
                        <div className="item-container-pq">
                            <div className="item-container-pq-totalPrice">{`Item Total: ${getTotalPrice(item)}`}</div>
                            <button type="button" onClick={()=>removeItem(item)}>Remove Item</button>
                        </div>
                    </div>)
                }
                <div className="finalTotal">
                    {`Grand Total: ${calculateTotal().toFixed(2)}`}
                
                </div>
            </div>
            

            
        </Cart>

    )
}