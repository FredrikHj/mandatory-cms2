import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { objAxiosUrls } from './Repeaters.js';
import { Reviews } from './Reviews.js';
import axios from 'axios';
import { updateLocalStorage } from './Store.js';
import { log } from 'util';

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

  let imgChangeArrIndex = 0;
  let imgChangeNr = 1;
  
  let productId = props.match.params.id;
  useEffect(() => {
    
    // Get Articles
    axios.get(`${objAxiosUrls.urlGetProductList}?filter[_id]=${productId}`, {
      headers: objAxiosUrls.cockpitToken
    })
    .then(response => {
      let incommingData = response.data.entries[0];
      console.log(incommingData);
      setIncomminngProduct(incommingData);                          // 
      updateImgSrc(incommingData.imgesGallery[imgArrIndex].path);   // 
      updateImgesTot(incommingData.imgesGallery.length);            // 
    })
    .catch((error) => {
      //console.log(error);
    });
  }, [imgArrIndex //setGetProductReview
  ]);  
  
  if (!incommingProduct) {
    return <p id="listGetting">Listan hämtas ...</p>;
  };
  let imgDecrease = () => {
    console.log('frs');
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
    // Add the product
    let toBasket = {
      productsName: incommingProduct.name,
      quantity: productQuantity,
      price: incommingProduct.price
    }
    shoppingBasketArr.push(toBasket);
    console.log(shoppingBasketArr);

    // Saving the shoppingBasketArr into localStorage
    window.localStorage.setItem('shoppingBasket', JSON.stringify(shoppingBasketArr));
  };
  let addProductQuantity  = (e) => {
    let tagetNr = e.target.value;
    updateProductQuantity(tagetNr);
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

    console.log(targetBtn);

    setGetProductReview(true)
  }
  let setReviewQuantity = (quantity) => {
    updateReviewQuantity(quantity);
  }
  
  if ( chooseBtnName === 'ProductList') return <Redirect to="/"/>;
  if ( chooseBtnName === 'ToBasket') return <Redirect to="/ShoppingBasket"/>;
console.log(reviewQuantity);

  return(       
    <>
    
      <div className="page">
        <table id="tableProducts">
          <thead>
            <tr>
              <th>Produktnamn</th><th>Pris</th><th>Köpeinformation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ incommingProduct.name }></td>
              <td>{ incommingProduct.price + ' kr' }</td>
              <td>
                <section id="buyProductContainer">
                  <section id="buyProduct">
                    <p id="">Köp:</p><input id="buyProductInput" type="number" onChange={ addProductQuantity } min="1"/>
                    <button id="addBasketBtn" className="chooseBtn"onClick={ addToBasket }>Lägg i Varukorgen</button>
                    <ChooseBtn
                      show={ chooseBtn }
                      moreShopping={ shoppingMore }
                      toBasket={ toBasket }/>
                  </section>
                  <p id="inStock">{ 'I lager: ' + incommingProduct.inStockQuantity }</p>               
                </section>
              </td> 
            </tr>
            <br></br>
            <tr><th colSpan="2">Beskrivnning</th></tr>
            <tr>
              <td colSpan="10">
                <section id="productDes">  
                    { incommingProduct.description }
                </section>  
              </td>
            </tr>
          </tbody>
        </table>
        <section id="reviewLinkContainer">
          <button onClick={ handleReview } id="reviewList" value="1">{'Antal recensioner: ' + reviewQuantity }</button>
          <button onClick={ handleReview } className="chooseBtn" id="addReview" value="2">Lägg till</button>
        </section>
          <Reviews
            productID={ productId }
            productName={ incommingProduct.name }
            setGetProductReview={ setGetProductReview }
            getProductReview={ getProductReview }
            productReviewShow={ productReviewShow }
            setReviewQuantity={ setReviewQuantity }
          />
        <section id="setImgControlContainer">
          <section id="imgContainer">
            { <img id="productImgGallery" src={'https://cmstenta.devspace.host/' + imgSrc } alt="produkt bild"/> }
          </section>
          <section id="setImgContainer">
            <button onClick={ imgDecrease } className="chooseBtn">-</button> <p id="sideNr">{ imgCurrentNr + ' / ' +  imgesTot }</p> <button onClick={ imgIncrease } className="chooseBtn">+</button>            
          </section>
        </section>


      </div>
    </>
  );
}

let ChooseBtn = (props) => {
  console.log(props);

  return(
    <section id="chooseBtn" style={( props.show === true) ? {display: 'block'} : null}>
      <button className="chooseBtn" onClick={ props.moreShopping }>Fortsätt handla</button>
      <button className="chooseBtn" onClick={ props.toBasket }>Till varukorg</button>   
    </section>
  );
}