import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
import {BehaviorSubject} from "rxjs";

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { CheckoutOrder } from './CheckoutOrder.js'; 
//import { shoppingBasket$ } from './Store.js';
import axios from 'axios';

const shoppingBasketArr = [];

export let ShoppingBasket = (props) => {
  let [ incommingProduct, updateIncommingProduct ] = useState([]);
  let [ returnProductList, setReturnProductList ] = useState(false);
  let [ productTotPrice, updateProductTotPrice ] = useState(0);
  let [ checkoutOrderEmtyMess, setCheckoutOrderEmtyMess ] = useState('');    // If no field is filled the text is saved here
  let [ checkoutOrder, setCheckoutOrder ] = useState(false);  
  let [ checkoutOrderName, setCheckoutOrderName ] = useState('');
  let [ checkoutOrderAddress, setCheckoutOrderAddresss ] = useState('');


  useEffect(() => {
    let shoppingBasket$ = new BehaviorSubject(window.localStorage.getItem('shoppingBasket'));
    let incommingData = JSON.parse(shoppingBasket$.value);
    console.log(incommingData);
    updateIncommingProduct(incommingData);
/* 
    shoppingBasket$.subscribe((shoppingBasket) => { 
    //}); */
  }, []);
/*   if (!incommingProduct) {
    return <p id="listGetting">Listan hämtas ...</p>;
  } */
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
    console.log(calcBasketTot);
    return calcBasketTot + ' Kr';
  }

let handleOrderName = (e) => {
    let targetStr = e.target.value;
    setCheckoutOrderName(targetStr);
    setCheckoutOrderEmtyMess('');
}
let handleOrderAddress = (e) => {
    let targetStr = e.target.value;
    setCheckoutOrderAddresss(targetStr);
    setCheckoutOrderEmtyMess('');
}
  let orderProducts = () => {
    setCheckoutOrder(true);

    console.log('Börja här imorgon!!!');
    
  }
  let checkoutOrderCancelBtn = () => {
    setReturnProductList(true);
    console.log('gre');
    
    //props.setGetProductReview(false);
  }
  let checkoutOrderBtn = () => {
    console.log('gre');
    setReturnProductList(true);
    alert('Tack för din beställning!');
}
  console.log(incommingProduct);
  if ( returnProductList === true) return <Redirect to="/"/>
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
              ? <p id="listGetting">Inga produkter ...</p> 
              : incommingProduct.map((obj, productCount) => {
                productCount += 1;
                let calcProductTo = obj.price*obj.quantity; 
                return (
                  <>
                      <tr key={productCount}>
                        <td>{ productCount }</td>
                        <td>{ obj.productsNamn }</td>
                        <td>{ obj.price }</td>
                        <td>{ obj.quantity }</td>
                        <td>{ calcProductTo }</td>
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
          <section id="proudctTotPrice">{ calcBasketTot() }</section>
        </section>
        <CheckoutOrder
          checkoutOrderEmtyMess={ checkoutOrderEmtyMess }
          checkoutOrderBtn={ checkoutOrderBtn }
          checkoutOrderCancelBtn={ checkoutOrderCancelBtn }
          handleOrderName={ handleOrderName }
          handleOrderAddress={ handleOrderAddress }
          checkoutOrderName={ checkoutOrderName }
          checkoutOrderAddress={ checkoutOrderAddress }
          checkoutOrder={ checkoutOrder }
          incommingProductArr={ incommingProduct }

        />
      </section>
    </>
  );
}