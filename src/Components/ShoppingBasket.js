import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
import {BehaviorSubject} from "rxjs";

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
//import { shoppingBasket$ } from './Store.js';
import axios from 'axios';
import { log } from 'util';
const shoppingBasketArr = [];

export let ShoppingBasket = (props) => {
  let [ incommingProduct, updateIncommingProduct ] = useState([]);
  let [ returnProductList, setReturnProductList ] = useState(false);
  let [ productTotPrice, updateProductTotPrice ] = useState(0);

  useEffect(() => {
    let shoppingBasket$ = new BehaviorSubject(window.localStorage.getItem('shoppingBasket'));
    let incommingData = JSON.parse(shoppingBasket$.value);
    console.log(incommingData);
    updateIncommingProduct(incommingData);
/* 
    shoppingBasket$.subscribe((shoppingBasket) => { 
    //}); */
  }, []);
 /*  if (!incommingProduct) {
    return <p id="listGetting">Listan hämtas ...</p>;
  } */
  let resetBasket = () => {
    localStorage.removeItem('shoppingBasket');
    updateIncommingProduct([]);
    setReturnProductList(true);
  }
  function calcBasketTot(){
    let calcBasketTot = 0;
    for (let index = 0; index < incommingProduct.length; index++) {
      const productPrice = incommingProduct[index].price;
      const productQuantity = incommingProduct[index].quantity;
      calcBasketTot+= productPrice*productQuantity;
    }
    console.log(calcBasketTot);
    return calcBasketTot + ' Kr';
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
        <table id="products">
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
        <section id="proudctTotPrice">{ calcBasketTot() }</section>
        <button id="resetBasketBtn" onClick={ resetBasket }>Rensa</button>
      </section>

    </>
  );
}