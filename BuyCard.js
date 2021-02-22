import styled,{keyframes} from 'styled-components';
import {useContext, useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';
import {MainContext} from '../App.js';

const fadeIn = keyframes`
    0% {opacity:0;}
    100% {opacity:1;}
`;

let Buy= styled.div`
animation:${fadeIn} .5s linear forwards;
    background-color:white;
    display:${props=>props.dis};
    grid-template-columns:1fr;
    padding:20px;
    box-sizing:border-box;
    align-items:center;
    position:sticky;
    
    top:130px;
    margin:auto;
    
    z-index:3;
    min-width:250px;
    max-width:500px;
    border:1px solid black;
    

    .card-container-image {
        width:calc(100% - 30px);
        height:140px;
        padding:20px;
        box-sizing:border-box;
        text-align:center;
        
        margin:30px auto 20px;
        >img {
            object-fit:contain;
            max-width:100%;
            height:100%;
        }
    }
    
    .card-container-brand {
        font-size:30px;
        font-weight:bold;
    }
    
    .card-container-model {
        font-size:22px;
         
    }

    .card-container-description {
        
    }

    .card-container-price {
        font-size:20px;
        font-weight:bold;
        margin:10px 0;
    }

    .card-container-quantity {
        display:flex;
        font-size:20px;
        
    }

    .card-container-quantity-input {
        width:40px;
        margin-left:20px;
        text-align:center;
        font-size:20px;
    }

    .card-container-inCart  {
        font-size:20px;
        color:red;
        margin:10px 0;
    }

    .card-container-btn {
        padding:10px;
        background:#2F376A;
        font-size:18px;
        color:white;
        cursor:pointer;
    }

    .card-container-close {
        content:"X";
        display:flex;
        justify-content:center;
        align-items:center;
        font-size:30px;
        cursor:pointer;
        
        position:absolute;
        top:10px;
        right:10px;
        font-weight:bold;
    }
    
`;


function BuyCard (props) {
    const [cardState,closeCard]=useState(props.visible);
    const [quant,changeQuant]=useState(1);
    useEffect(()=>closeCard(props.visible),[props.visible])
    
    let cartContext = useContext(MainContext);
    
    function closeDownCard () {
        props.stateChanger({},[],"none")

    }

    function addToCart () {
        cartContext.cartDispatch({type:"add", data:props.info,quantity:quant})
        changeQuant(1)
        closeDownCard()
    }

    function quantityFunc (e) {
        changeQuant(Number(e.target.value))
    }

    
    
    function checkCart() {
        let checker=false;
        for(let i of cartContext.cartState){
            if(props.info.brand===i.brand && props.info.model===i.model){
                checker=true;
            }
        }
        return checker;
    }    


    return (
        <Buy dis={cardState}>
            <div className="card-container-close" onClick={closeDownCard}>X</div>
            <div className="card-container-image"><img alt="props.info.brand" src={props.info.image}/></div>
            <div className="card-container-brand">{props.info.brand}</div>
            <div className="card-container-model">{props.info.model}</div>
            <div className="card-container-description">{props.info.description}</div>
            <div className="card-container-filters">{props.info.filters}</div>
            <div className="card-container-price">{props.info.price}</div>
            <div className="card-container-quantity"><label>Quantity:</label><input className="card-container-quantity-input" type="number" value={quant} min={1} onChange={(e)=>quantityFunc(e)}/></div>
            <div className="card-container-inCart">{checkCart() && "This item is in your cart already. Add more if you like."}</div>
            <button className="card-container-btn" type="button" onClick={addToCart}>Add to Cart</button>
        </Buy>
    )
}


export default BuyCard;