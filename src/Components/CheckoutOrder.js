import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
import { objAxiosUrls } from './Repeaters.js';
import axios from 'axios';

export let CheckoutOrder = (props) => {
  //let [ incommingReviews, setIncommingReviews ] = useState([]);
  let [ checkoutOrderEmtyMess, setCheckoutOrderEmtyMess ] = useState('');    // If no field is filled the text is saved here
  let [ checkoutOrderName, setCheckoutOrderName ] = useState(['']);
  let [ checkoutOrderAddress, setCheckoutOrderAddress ] = useState('');
  let [ ordersDataProducts, setOrdersProductsData ] = useState(null);
  let [ orderNr, setOrderNr ] = useState('');
  useEffect(() =>{
    // Get products
    axios.get(`${objAxiosUrls.urlGetCheckoutOrder}`, {
      headers: objAxiosUrls.cockpitToken
    })
    .then(response => {
      console.log(response.data.entries);

    })
    .catch((error) => {
      //console.log(error);
    });
      });
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
  let checkoutOrderBtn = () => {
    if (checkoutOrderName === '' || checkoutOrderAddress === '') {
      setCheckoutOrderEmtyMess('Fält ifyllda?');
    } else {

      // Get out the requaried data from the basket array, store the data in an array
      let orderProductsDataArr = [];
      let orderProductsDataObj = {};
      for (let index = 0; index < props.incommingProductArr.length; index++) {
        let orderName = props.incommingProductArr[index].productsName;
        orderProductsDataObj.orderName = orderName;
        let orderQuantity = props.incommingProductArr[index].quantity;
        orderProductsDataObj.orderQuantity = orderQuantity;
        let orderPrice = props.incommingProductArr[index].price;
        orderProductsDataObj.orderPrice = orderPrice;

        orderProductsDataArr.push({ value: orderProductsDataObj });
      }


      // Give the order a orderNr
      let orderNr = Math.random()*10000;
      let cleanedOrderNr = Math.ceil(orderNr);
      setOrderNr(cleanedOrderNr);
      
      // Post a order and display the respond from the backend
      axios.post(`${objAxiosUrls.urlPostCheckoutOrder}` //?=${props.productId}`
      ,{
        headers: objAxiosUrls.cockpitToken,
        data: {
          orderNr: cleanedOrderNr,
          name: checkoutOrderName,
          address: checkoutOrderAddress,
          totPrice: props.productTotPrice,
          productList: orderProductsDataArr,
          orderReceived: true, 
        }
      })
      .then(response => {
        let incommingData = response;
        console.log(incommingData);
        if (incommingData) {
          console.log(orderProductsDataArr);
          
          // Emtying all field, data and stuff corresponding to the order
          /*           setCheckoutOrderName('');
          setCheckoutOrderAddress('');
          ordersDataProducts = [];
          props.setReturnProductList(true);
          localStorage.removeItem('shoppingBasket');
          alert('Tack för din beställning - Order Nr: ' + orderNr); */
        } else return;
      })
      .catch((error) => {
        console.log(error);
      });
 
    }
  }
  let checkoutOrderCancelBtn = () => {
    props.setReturnProductList(true);

    console.log('gre');
    
    //setGetProductReview(false);
  }
  console.log(ordersDataProducts);
  
    return(
      <section id="checkoutOrderedContainer" style={(props.checkoutOrder === true) ? {display: 'block'} : {display: 'none'}}>
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
                <td colSpan="2">{ props.productTotPrice + ' Kr'}</td>   
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
                  return (
                    <tr key={ productOrderCount }>
                      <td>{ productOrderCount }</td>
                      <td>{ obj.productsName }</td>
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
          <button onClick={ checkoutOrderCancelBtn } className="chooseBtn" id="addReview">Avbryt</button>
          <button onClick={ checkoutOrderBtn } className="chooseBtn" id="addReview">Lägg beställning</button>
        </section>
                
      </section>

    );
  }