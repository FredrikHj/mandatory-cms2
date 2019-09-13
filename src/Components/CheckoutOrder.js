import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";

export let CheckoutOrder = (props) => {
    return(   
      <section id="checkoutOrderedContainer" style={(props.checkoutOrder !== true) ? {display: 'block'} : {display: 'none'}}>
        <p className="headLineRewview">{'Beställning - ' + ''}  </p>
          <table id="tableReview">
            <thead>
              <tr><th>Namn</th><th>Adress</th><th colSpan="2">Totalt pris</th></tr>
              <tr>
                <td><input id="inputCheckoutOrder" type="text" onChange={ props.handleOrderName } value={ props.checkoutOrderName } required/></td>   
                <td><input id="inputCheckoutOrder" type="text" onChange={ props.handleOrderAddress } value={ props.checkoutOrderAddress } required/></td>
                <td colSpan="2">{ '' }</td>   
              </tr>
              <br></br>
              <tr>
                <th colSpan="10">
                  Beställda produkter
                </th>  
              </tr>    
              <tr>
              <th>Nr</th><th>Namn</th><th>Antal</th><th>Rad pris</th>
              </tr> 
            </thead>
            <tbody>
              {
  
                props.incommingProductArr.map((obj, productOrderCount) => {
                  productOrderCount+= 1;
                  console.log(obj);
                  
                  return (
                    <tr key={ productOrderCount }>
                      <td>{ productOrderCount }</td>
                      <td>{ obj.productsNamn }</td>
                      <td>{ obj.quantity }</td>
                      <td>{ obj.quantity*obj.price }</td>
                    </tr>
                  );
                })
              }
            </tbody>
        </table>
        <p id="checkoutOrderFieldEmtyMess">{ props.checkoutOrderEmtyMess }</p>
        <section id="checkoutOrderBtn">
          <button onClick={ props.checkoutOrderCancelBtn  } className="chooseBtn" id="addReview">Avbryt</button>
          <button onClick={ props.checkoutOrderBtn } className="chooseBtn" id="addReview">Lägg beställning</button>
        </section>
                
      </section>
  
    );
  }