import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
import { objProductList } from './Repeaters.js';
import axios from 'axios';

export let CheckoutOrder = (props) => {
  //let [ incommingReviews, setIncommingReviews ] = useState([]);
  let [ checkoutOrderEmtyMess, setCheckoutOrderEmtyMess ] = useState('');    // If no field is filled the text is saved here
  let [ checkoutOrderName, setCheckoutOrderName ] = useState('');
  let [ checkoutOrderAddress, setCheckoutOrderAddress ] = useState('');

  useEffect(() => {
    // Get Review
     axios.get(`${objProductList.urlPostCheckoutOrder}`//?=${productId}`
     , {
      headers: objProductList.cockpitToken
    })
    .then(response => {
        let incommingData = response.data.entries;
        console.log(incommingData);
        //setIncommingReviews(incommingData);                          
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);
  let handleOrderName = (e) => {
    let targetStr = e.target.value;
    setCheckoutOrderName(targetStr);
    setCheckoutOrderEmtyMess('');
}
let handleOrderAddress = (e) => {
    let targetStr = e.target.value;
    setCheckoutOrderAddress(targetStr);
    setCheckoutOrderEmtyMess('');
}

    return(
      <section id="checkoutOrderedContainer" style={(props.checkoutOrder !== true) ? {display: 'block'} : {display: 'none'}}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{'Webhshopp - Varukorg'}</title>
        </Helmet>
        <p className="headLineRewview">Beställning</p>
          <table id="tableReview">
            <thead>
              <tr><th>Namn</th><th>Adress</th><th colSpan="2">Totalt pris</th></tr>
              <tr>
                <td><input id="inputCheckoutOrder" type="text" onChange={ handleOrderName } value={ checkoutOrderName } required/></td>   
                <td><input id="inputCheckoutOrder" type="text" onChange={ handleOrderAddress } value={ checkoutOrderAddress } required/></td>
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
        <p id="checkoutOrderFieldEmtyMess">{ checkoutOrderEmtyMess }</p>
        <section id="checkoutOrderBtn">
          <button onClick={ props.checkoutOrderCancelBtn  } className="chooseBtn" id="addReview">Avbryt</button>
          <button onClick={ props.checkoutOrderBtn } className="chooseBtn" id="addReview">Lägg beställning</button>
        </section>
                
      </section>
  
    );
  }