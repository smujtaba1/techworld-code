import styled, {keyframes}from 'styled-components';
import BuyCard from './BuyCard.js';
import {useEffect, useState} from 'react';
import {HashRouter as Router, Link, Switch,Route,useHistory} from 'react-router-dom';


const fadeIn = keyframes`
    0% {opacity:0;}
    100% {opacity:1;}
`;
const Page = styled.div`
    
    animation:${fadeIn} .5s linear forwards;

    .category-page-overlay {
        height:100%;
        width:100%;
        background:black;
        position:fixed;
        top:0;
        left:0;
        opacity:.8;
        z-index:2;
    }

    .category-page {
        position:relative;
    }

    .category-main {
        margin-bottom:40px;
    }

    .category-main-sort {
        margin-bottom:20px;
    }

    .category-filter {
        float:left;
        margin-right:40px;
        position:sticky;
        top:120px;

        @media screen and (max-width:575px){
            position:relative;
            float:none;
            top:0px;
            margin-right:0;
            margin-bottom:10px;
           
        }
    }

    .category-filter-title {
        font-weight:bold;
        text-decoration:underline;
        margin-bottom:6px;
        font-size:20px;
    }

    .category-filter-box {
        margin-top:10px;
    }

    .category-filter-box-subtitle {
        font-weight:bold;
        margin-bottom:2px;
    }

    .category-main-products {
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(250px,300px));
        grid-gap:20px;
        
        
        @media screen and (max-width:1399px){
            grid-template-columns:repeat(auto-fit,minmax(30%,1fr));
            grid-gap:10px;
        }

        @media screen and (max-width:767px){
            grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
            grid-gap:10px;
        }

        
    }

    .category-main-pagesnav {
        display:flex;
        width:100%;
        justify-content:center;
        margin-top:35px;
        >span {
            display:block;
            margin:10px;
        }

        >a {
            
            font-size:18px;
            margin:5px;
            display:block;
            padding:5px 10px;
           

            &:link,&:visited {
                color:black;
            }

            &:hover {
                background:grey;
            }

            &:nth-child(${(props)=>props.pageNumStyle}) {
                background:black;
                color:white;
            }
        }

        
    }

    .category-main-perPage {
        margin-top:20px;
        text-align:center;
    }

    .category-title {
        
        margin:40px 0;
    }
    .product-container {
      
        background:white;
        width:100%;
        box-sizing:border-box;
        padding:20px;
        display:flex;
        flex-direction:column;
        align-items:flex-start;
    }

    .product-container-image {
        height:140px;
        width:100%;
        display:flex;
        flex-direction:row;
        justify-content:center;
        align-items:center;
        margin-bottom:20px;
    }

    .product-container-image >img {
        width:100%;
        max-height:100%;
        object-fit:contain;
    }

    .product-container-brand {
        font-weight:bold;
        font-size:18px;
    }

    .product-container-description{
        height:48px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    
    .product-container-price {
        font-weight:bold;
        font-size:18px;
        margin-top:15px;
    }

    .product-container-filters {
        margin:15px 0;
    }

    .product-container-btn {
        padding:5px;
        background:#2F376A;
        color:white;
        width:100%;
        margin-top:10px;
        cursor:pointer;
        font-size:18px;
    }
    

`;



function CategoryPage (props) {
    
    const [sorted,toggleSort] = useState([...props.items]);
    const [sortState,changeSortState]= useState([]);
    
    const [filterList,changeFilterList]=useState({});
    const [cardDisplay,toggleCardDisplay]= useState("none");
    const [buyCardInfo, makeBuyCardInfo]=useState({});
    const [currPage,changeCurrPage]=useState(2);
    const [perPage,changePerPage]=useState(5);


    function makeFilterHead(){
        return props.filters.map(
            (value,index)=>
            <div className="category-filter-box" key={index}>
                <div className="category-filter-box-subtitle">{value.charAt(0).toUpperCase()+value.slice(1)}</div>
                {makeFilterBody(value)}
            </div>
        )
    }

    function inputCheck(value,index,array,heading){
        
        let checked=false;
        
        for (let i=0;i<sorted.length;i++){
            if(sorted[i][heading]===value){
                checked=true
            }
        }
       
        return checked
    }

    function checkUnits(heading){
        let myString=""+heading+"Unit"
        if(props.items[0][myString]){
            return " "+ props.items[0][myString]
        }else {
            return ""
        }
       
    }

    function makeFilterBody(heading){
        return props.items.map(
            (value,index,array)=>
           array[index][heading]
        ).filter(
            (value,index,array)=>
            array.indexOf(value)===index
        ).sort(
            (a,b)=>
            a-b
        ).map(
            (value,index,array)=>
            <div key={index}>
                <input type="checkbox" 
                disabled={inputCheck(value,index,array,heading)?false:true}
                value={value} onChange={e=>checkBox(e,heading,value)}/>
                <span style={inputCheck(value,index,array,heading)?{color:"black"}:{color:"grey"}}>{value+ checkUnits(heading)}</span>
            </div>
        )
    }

    function makeFilterInfo(item){
        return props.filters.slice(1,props.filters.length).map(
            (value,index,array)=>
            <div key={index}>{value.charAt(0).toUpperCase()+value.slice(1) + ": " + item[value] +"" +checkUnits(value)}</div>
        )
    }

    let history=useHistory();
    function checkBox (element,name,value) {
        changeCurrPage(2);
        let arr={...filterList}
        if(element.target.checked){
            if(arr[name]) {
                arr[name].push(value)
            }else {
                arr[name]=[value]
            }
            
        }else {
           if(arr[name].length ===1) {
               delete arr[name]
           }else{
               arr[name].splice(arr[name].indexOf(value),1)
           }
        }
        changeFilterList(arr)
        history.push("1")
    }
    


    function filterArray(){
        let filterObj={...filterList};
        let mainItems=[...props.items];
        
        if (Object.getOwnPropertyNames(filterObj).length===0){
            toggleSort([...props.items])
            return
        }
        for (let i in filterObj){
            mainItems=mainItems.filter((value,index,array)=>filterObj[i].indexOf(value[i])!==-1)
        }
        
        if(sortState==="increase"){
            mainItems=(mainItems.sort((a,b)=>a.price-b.price))
        }else if(sortState==="decrease"){
            mainItems=(mainItems.sort((a,b)=>b.price-a.price))
        }

        toggleSort(mainItems)
    }

    useEffect(filterArray,[filterList])
    
    function sortChange(el) {
        
        if(el.target.value==="increase"){
            changeSortState("increase")
        }else if (el.target.value==="decrease"){
            changeSortState("decrease")
        }
    }

    function sortSorted() {
        if(sortState==="increase"){
            toggleSort([...sorted].sort((a,b)=>a.price-b.price))
        }else if(sortState==="decrease"){
            toggleSort([...sorted].sort((a,b)=>b.price-a.price))
        }
    }

    useEffect(sortSorted,[sortState])

    

    function makeCard(prodObj,filterObj,type){
        toggleCardDisplay(type);
        makeBuyCardInfo({...prodObj,filters:filterObj})
    }

    function CurrentPage(props){

        return (
                props.items.map(
                    (value,index,array)=>
                        <div className="product-container" key={index}>
                            <div className="product-container-image"><img alt={value.brand+value.model} src={value.image}/></div>
                            <div className="product-container-brand">{value.brand}</div>
                            <div>{value.model}</div>
                            <div className="product-container-filters">{makeFilterInfo(value)}</div>
                            <div className="product-container-description">{value.description}</div>
                            <div className="product-container-price">{value.price.toFixed(2)}</div>
                            <button type="button" className="product-container-btn"
                                onClick={()=>makeCard(value,makeFilterInfo(value),"grid")}>
                                    Buy
                            </button>
                        </div>
                )
        )
    }
    
    
   
    function createPageRoutes () {
        let pagesArray = [];
        //2
        for (let i=0;i<sorted.length;i+=perPage){
            console.log(i,i+perPage)
            pagesArray.push(sorted.slice(i,i+perPage))
        }
        
      
        

        return (
            <div>
                <div className="category-main-products">
                    <Router>
                        <Switch>
                            {pagesArray.map((val,ind,arr)=>
                                <Route key={ind} render={()=><CurrentPage key={ind} items={val}/>} numbs={ind} path={`${props.match.path}/${ind+1}`}/>
                            )}
                        </Switch>
                    </Router>
                </div>
                <div className="category-main-pagesnav">
                    <span>Page: </span>
                    {pagesArray.map((val,ind,arr)=><Link onClick={()=>changeCurrPage(ind+2)}key={ind} to={`${props.match.path}/${ind+1}`}>{ind+1}</Link>)}
                </div>
            </div>
        )
    }

    function modPerPage(e) {
      
        changeCurrPage(2);
        
        changePerPage(Number(e.target.value))
        history.push("1");
    }
   
    
    return (
        
        <Page className="wrapper" pageNumStyle={currPage}>
            {cardDisplay==="grid" && <div className="category-page-overlay"></div>}
            <BuyCard visible={cardDisplay} info={buyCardInfo} stateChanger={makeCard}/>
            <div className="category-page">
                <h1 className="category-title">{props.title}</h1>
                <div className="category-filter">
                        <div className="category-filter-title">{"Filter"}</div>
                        {makeFilterHead()}
                </div>
                <div className="category-main">
                    <div className="category-main-sort">
                        <label>{"Sort: "} </label>
                        <select defaultValue="selected" onChange={(e)=>sortChange(e)}>
                            <option value="selected" disabled>Select</option>
                            <option value="increase">Price Low to High</option>
                            <option value="decrease">Price High to Low</option>
                        </select>
                    </div>
                        {createPageRoutes()}
                        <div className="category-main-perPage">
                            <label>Items per page: </label>
                            <select defaultValue="5" onChange={(e)=>modPerPage(e)}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>

                        </div>
                        
                       
                </div>
            </div>
        
        </Page>
    )
}

export default CategoryPage;