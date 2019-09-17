import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
import {BehaviorSubject} from "rxjs";

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { CheckoutOrder } from './CheckoutOrder.js'; 
import { objAxiosUrls } from './Repeaters.js';

//import { shoppingBasket$ } from './Store.js';




export let ShoppingBasket = (props) => {
  let [ reRender, runReRender ] = useState(true);
  let [ incommingProduct, updateIncommingProduct ] = useState([]);
  let [ returnProductList, setReturnProductList ] = useState(false);
  let [ productTotPrice, updateProductTotPrice ] = useState(0);
  let [ checkoutOrder, setCheckoutOrder ] = useState(false);  

  useEffect(() => {
    let shoppingBasket$ = new BehaviorSubject(window.localStorage.getItem('shoppingBasket'));
    let incommingData = JSON.parse(shoppingBasket$.value);
  
/*     //console.log(incommingData);
    if (reRender === true) { */
      calcBasketTot();
      updateIncommingProduct(incommingData);
      //runReRender(false);
   // } else {
      calcBasketTot();
/*       return;
    } */
  }, []);
  let resetBasket = () => {
    localStorage.removeItem('shoppingBasket');
    updateIncommingProduct([]);
    setReturnProductList(true);
  }

  function calcBasketTot(){
    let calcBasketTot = 0;
    if (incommingProduct) {
      for (let index = 0; index < incommingProduct.length; index++) {
        const productPrice = incommingProduct[index].price;
        const productQuantity = incommingProduct[index].quantity;
        calcBasketTot+= productPrice*productQuantity;
      }
    }
    else calcBasketTot = 0;
    updateProductTotPrice(calcBasketTot);
    return calcBasketTot + ' Kr';
  }
  let orderProducts = () => {
    setCheckoutOrder(true);
    
  }
  if ( returnProductList === true) return <Redirect to="/"/>
  console.log(incommingProduct.length);
  
  return(      
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{'Webhshopp - Varukorg'}</title>
      </Helmet>
      <p className="headLineShoppingBasket">- Varukorg</p>
      <section id="shoppingBasketContainer">
        <table id="tableProducts">
          <thead>
            <tr><th>Nr</th><th>Produktnamn</th><th>Enhetspris</th><th>Antal</th><th>Totalt</th></tr>
          </thead>
          <tbody>
            {(!incommingProduct)
              ? <tr><td><p id="listGetting">Inga produkter ...</p></td></tr> 
              : incommingProduct.map((obj, productCount) => {
                productCount += 1;                
                let calcProductTot  = obj.price*obj.quantity; 
                return (
                  <>
                      <tr key={productCount}>
                        <td>{ productCount }</td>
                        <td>{ obj.productsName }</td>
                        <td>{ obj.price  + ' Kr'}</td>
                        <td>{ obj.quantity }</td>
                        <td>{ calcProductTot } Kr</td>
                      </tr>
                    </>
                  );
                })
            }
          </tbody>
        </table>
        <section id="basketFooter">
          <section></section>
          <button id="resetBasketBtn" onClick={ resetBasket } className="chooseBtn">Rensa</button>
          <button id="resetBasketBtn" onClick={ orderProducts } className="chooseBtn"
             style={(incommingProduct) ? {display: 'block'} : {display: 'none'}}>Beställ</button>
          <section id="proudctTotPrice">{ productTotPrice }</section>
        </section>
        <CheckoutOrder
          setCheckoutOrder={ setCheckoutOrder }
          checkoutOrder={ checkoutOrder }
          incommingProductArr={ incommingProduct } 
          productTotPrice={ productTotPrice }
          setReturnProductList={ setReturnProductList }
        />
      </section>
    </>
  );
}