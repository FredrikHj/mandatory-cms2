import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { objAxiosUrls } from './Repeaters.js';
import { ProductReview } from './Reviews.js';
import { updateShoppingBasket, currentShoppingBasket$ } from './Store.js';
import axios from 'axios';
import { log } from 'util';
import { tsExternalModuleReference } from '@babel/types';
let shoppingBasketArr = [];


export let ProductDetail = (props) => {
  let [ incommingProduct, setIncomminngProduct ] = useState(null);
  let [ imgCurrentNr, updateImgCurrentNr ] = useState(1)
  let [ imgSrc, updateImgSrc ] = useState('');
  let [ imgesTot, updateImgesTot ] = useState(0);
  let [ imgArrIndex, updateImgArrIndex ] = useState(0);
  let [ chooseBtn, setChooseBtn ] = useState(false);
  let [ chooseBtnName, setChooseBtnName ] = useState('');
  let [ productQuantity, updateProductQuantity ] = useState(0);
  let [ getProductReview, setGetProductReview ] = useState(false);
  let [ productReviewShow, setProductReviewShow ] = useState('');
  let [ reviewQuantity, updateReviewQuantity ] = useState(0);
  let [ shoppingBasketObj, setShoppingBasketObj ] = useState({});

  //let shoppingBasketObj = {};
  let imgChangeArrIndex = 0;
  let imgChangeNr = 1;
  
  let productId = props.match.params.id;
  
  useEffect(() => {
   currentShoppingBasket$.subscribe((currentShoppingBasket) => {
       if (currentShoppingBasket.length === 0) {       
        // Emtying the shoppingBasketArr
        shoppingBasketArr = [];
      }
    });
    // Get Articles
    axios.get(`${objAxiosUrls.urlGetProductList}?filter[_id]=${productId}`, {
      headers: objAxiosUrls.cockpitToken
    })
    .then(response => {
      let incommingData = response.data.entries[0];
      //console.log(incommingData);
      updateShoppingBasket(incommingData);
      setIncomminngProduct(incommingData);                          // 
      updateImgSrc(incommingData.imgesGallery[imgArrIndex].path);   // 
      updateImgesTot(incommingData.imgesGallery.length);            // 
    })
    .catch((error) => {
      //console.log(error);
    });
  }, [imgArrIndex, reviewQuantity]);  
  
  if (!incommingProduct) {
    return <p id="listGetting">Listan hämtas ...</p>;
  };
  let imgDecrease = () => {
    imgChangeArrIndex = imgArrIndex - 1;
    imgChangeNr = imgCurrentNr - 1; 
    
    if ( imgChangeNr < 1) return;
    else {
      updateImgArrIndex(imgChangeArrIndex);
      updateImgCurrentNr(imgChangeNr);
    }
  };
  let imgIncrease = () => {
    imgChangeArrIndex = imgArrIndex + 1;
    imgChangeNr = imgCurrentNr + 1;
    
    if (imgChangeNr > incommingProduct.imgesGallery.length) return;
    else {
      updateImgArrIndex(imgChangeArrIndex);
      updateImgCurrentNr(imgChangeNr);
    }
  };
  let addToBasket = () => {
    setChooseBtn(true);
    console.log(shoppingBasketArr);
    console.log(incommingProduct.name);
    
    for (let index = 0; index < shoppingBasketArr.length; index++) {
      let contentsOfObj = shoppingBasketArr[index].productsName;
      console.log(contentsOfObj);
      if (contentsOfObj === incommingProduct.name) {
        console.log('fs');
        console.log(shoppingBasketArr[index].quantity);
        shoppingBasketArr[index].quantity += productQuantity;
        console.log('Ökar');
      }
/*       // Check if a key exist     
      if (test in shoppingBasketObj){

      }
      else{
        shoppingBasketObj['quantity'] = productQuantity;
        console.log('Oförändrad'); 
      }

 */      /* 
      for (const key in element) {
        let test = element[key];
        console.log(test);
          
        
      } */

      
      
    }
    // Reset basket
 //   for (let key in shoppingBasketObj) {
      shoppingBasketObj['productsName'] = incommingProduct.name;
      shoppingBasketObj['quantity'] = productQuantity;
      shoppingBasketObj['price'] = parseInt(incommingProduct.price);
      
      shoppingBasketArr.push(shoppingBasketObj);
      // }
      
      // Add the product


    // Saving the shoppingBasketArr into localStorage
    window.localStorage.setItem('shoppingBasket', JSON.stringify(shoppingBasketArr));
  };
  let addProductQuantity  = (e) => {
    let targetNr = parseInt(e.target.value);      
    updateProductQuantity(targetNr);
  };
  
  let shoppingMore = () => {
    setChooseBtn(false);
    setChooseBtnName('ProductList');
  };
  let toBasket = () => {
    setChooseBtn(false);
    setChooseBtnName('ToBasket');
  };
  let handleReview = (e) => {
    let targetBtn = e.target.value;
    console.log(targetBtn);
    
    if (targetBtn === '1') setProductReviewShow(targetBtn);
    if (targetBtn === '2') setProductReviewShow(targetBtn);
    setGetProductReview(true)
  }
  let setReviewQuantity = (quantity) => { // Fix
    updateReviewQuantity(quantity);
  }
 
  if ( chooseBtnName === 'ProductList') return <Redirect to="/"/>;
  if ( chooseBtnName === 'ToBasket') return <Redirect to="/ShoppingBasket"/>;

  return(       
    <>
      <table id="tableProduct1">
        <thead>
          <tr>
            <th className="tableProduct1Th1">Produktnamn</th><th className="tableProduct1Th2">Pris</th><th>Köpeinformation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tableProduct1Th1">{ incommingProduct.name }</td>
            <td className="tableProduct1Th2">{ incommingProduct.price + ' kr' }</td>
            <td>
              <section style={(chooseBtn ===  true) ? {display: 'none'} : {display: 'block'}}>

                <p id="inStock">{ 'I lager: ' + incommingProduct.inStockQuantity }</p>               
                <section id="buyProductContainer">
                  <section id="buyProduct">
                    <p id="">Köp:</p><input id="buyProductInput" type="number" onChange={ addProductQuantity } min="1"/>
                    <button id="addBasketBtn" className="chooseBtn" onClick={ addToBasket }>Lägg i Varukorgen</button>
                  </section>
                </section>
              </section>
              <ChooseBtn
                show={ chooseBtn }
                moreShopping={ shoppingMore }
                toBasket={ toBasket }
                />
            </td> 
          </tr>
        </tbody>
      </table>
      <section id="reviewLinkContainer">
        <button onClick=
          {(reviewQuantity === 0)
            ? null
            : handleReview 
          } 
          id="reviewList" value="1">
          {(reviewQuantity === 0)
            ?
              'Antal recensioner: ' + reviewQuantity + ' -->'
          
          
            :             
              'Antal recensioner: ' + reviewQuantity
          }
        </button>
        <button onClick={ handleReview } className="chooseBtn" id="addReview" value="2">Lägg till</button>
      </section>
      <section id="productDesReviewContainer"> 
        <section id="productDesReviewHead">
          <section>
            <p id="productDesReviewHeadLine">Beskrivnning</p>
          </section>
          <section>

          </section>
        </section>
      </section>
      <main id="productDesContainer"> 
       { incommingProduct.description }
      </main>

      <ProductReview
        productID={ productId }
        productName={ incommingProduct.name }
        setGetProductReview={ setGetProductReview }
        getProductReview={ getProductReview }
        productReviewShow={ productReviewShow }
        setReviewQuantity={ setReviewQuantity }
        productId={ productId }
      />
        <section id="setImgControlContainer">
          <section id="imgContainer">
            { <img id="productImgGallery" src={'https://cmstenta.devspace.host/' + imgSrc } alt="produkt bild"/> }
          </section>
            <section id="setImgContainer">
            <button onClick={ imgDecrease } className="chooseBtn">-</button> <p id="sideNr">{ imgCurrentNr + ' / ' +  imgesTot }</p> <button onClick={ imgIncrease } className="chooseBtn">+</button>            
          </section>
        </section>
 
    </>
  );
}

let ChooseBtn = (props) => {
  return(
    <section id="chooseBtnShoppBasket" style={( props.show === true) ? {display: 'block'} : null}>
      <button className="chooseBtn" onClick={ props.moreShopping }>Fortsätt handla</button>
      <button className="chooseBtn" onClick={ props.toBasket }>Till varukorg</button>   
    </section>
  );
}