import './App.css';
import React,{useReducer} from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CategoryPage from './components/CategoryPage';
import data from './data';
import {ThemeProvider} from 'styled-components';
import { ShoppingCart } from './components/ShoppingCart';



export const MainContext = React.createContext();

let cartInit = [];

let cartReducer = (state,action) => {
  let currentObject = {...action.data};
  let currentArray=[...state]
  //if it's in there
  //if it's not
  let found=false;

  
  if(action.type==="add"){
    for (let i of currentArray) {
      if(currentObject.brand === i['brand'] && currentObject.model === i['model']){
        found=true;
        i['quantity']+=action.quantity
      }
    }
    if(!found) {
      currentArray.push({...currentObject,quantity:action.quantity})
      
    }
    return currentArray
    
  }else if(action.type==="remove"){
   
    let myArray=currentArray.filter((item)=>
        {
          
          if(item.brand===currentObject.brand && item.model===currentObject.model){
            return false
          }else {
            return true
          }
        })
     
    return myArray;
  }  
}


const theme={
    name:"black"
};

function App(props) {
  const [state, dispatch] = useReducer(cartReducer,cartInit);
  

  

  return (
    <MainContext.Provider value={{cartState:state,cartDispatch:dispatch}}>
      <ThemeProvider theme={theme}>
      <div className="App">
          <Router>
          <Navbar/>
            <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/powersupplies" render={(props)=><CategoryPage match={props.match} key="1" title="Power Supplies" items={data.powerSupplies} filters={["brand","power"]}/>}/>
            <Route path="/graphicscards" render={(props)=><CategoryPage match={props.match} key="2" title="Graphics Cards" items={data.graphicsCards} filters={["brand","memory"]}/>}/>
            <Route path="/memoryram" render={(props)=><CategoryPage match={props.match} key="3" title="Memory/Ram" items={data.ram} filters={["brand","capacity","type"]}/>}/>
            <Route path="/storage" render={(props)=><CategoryPage match={props.match} key="4" title="Storage Drives" items={data.storage} filters={["brand","capacity","type"]}/>}/>
            <Route path="/cpus" render={(props)=><CategoryPage match={props.match} key="5" title="CPU's" items={data.processors} filters={["brand", "speed"]}/>}/>
            <Route path="/mice" render={(props)=><CategoryPage match={props.match} key="6" title="Mice" items={data.mice} filters={["brand","type"]}/>}/>
            <Route path="/keyboards" render={(props)=><CategoryPage match={props.match} key="7" title="Keyboards" filters={["brand","type"]} items={data.keyboards}/>}/>
            <Route path="/wifi" render={(props)=><CategoryPage match={props.match} key="8" title="Wifi Adapters" filters={["brand"]} items={data.wifi}/>}/>
            <Route path="/shoppingcart" render={(props)=><ShoppingCart/>}/>
            </Switch>
          <Footer/>
          
          </Router>
        
      </div>
    </ThemeProvider>
    </MainContext.Provider>
    
  );
}

export default App;
