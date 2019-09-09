import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';

export let ProductDetail = (props) => {
  let [ incommingProduct, setIncomminngProduct ] = useState(null);
  let [ imgCurrentNr, updateImgCurrentNr ] = useState(1)
  let [ imgSrc, updateImgSrc ] = useState('');
  let [ imgesTot, updateImgesTot ] = useState(0);
  let [ imgArrIndex, updateImgArrIndex ] = useState(0);
  let [ chooseBtn, setChooseBtn ] = useState(false);
  let imgChangeArrIndex = 0;
  let imgChangeNr = 1;
  

  let productId = props.match.params.id;
  useEffect(() => {

    // Get Articles
    axios.get('https://cmstenta.devspace.host/api/collections/get/products?filter[_id]=' + productId, {
    headers: { 'Cockpit-Token': '6f17f3f1b843b47ae5c16a52c8c83e}' }
  })
    .then(response => {
      let incommingData = response.data.entries[0];
      console.log(incommingData);
      setIncomminngProduct(incommingData);
      updateImgSrc(incommingData.imgesGallery[imgArrIndex].path);
      updateImgesTot(incommingData.imgesGallery.length);
    })
    .catch((error) => {
      //console.log(error);
    });
  }, [imgArrIndex]);  
 
  if (!incommingProduct) {
    return <p id="listGetting">Listan hämtas ...</p>;
  }
  let imgDecrease = () => {
    console.log('frs');
    imgChangeArrIndex = imgArrIndex - 1;
    imgChangeNr = imgCurrentNr - 1; 

    if ( imgChangeNr < 1) return;
    else {
      updateImgArrIndex(imgChangeArrIndex);
      updateImgCurrentNr(imgChangeNr);
    }
  }
  let imgIncrease = () => {
    console.log('frs');
    imgChangeArrIndex = imgArrIndex + 1;
    imgChangeNr = imgCurrentNr + 1;

    if (imgChangeNr > incommingProduct.imgesGallery.length) return;
    else {
      updateImgArrIndex(imgChangeArrIndex);
      updateImgCurrentNr(imgChangeNr);
    }
  }
  let addToBasket = () => {
    setChooseBtn(true);
  }
  
  let shoppingMore = () => {
    setChooseBtn(false);
    if ( chooseBtn === false) return <Redirect to="/"/>
  }
  let toBasket = () => {
    setChooseBtn(false);

  }
  return(       
    <>
    
      <div className="page">
        <table id="products">
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
                <section id="buyProduktContainer">
                  <section id="buyProdukt">
                    <p id="">Köp:</p><input id="buyProduktInput" type="number"/>
                    <button id="addBasketBtn" className="chooseBtn"onClick={ addToBasket }>Lägg i Varukorgen</button>
                    <ChooseBtn
                      show={ chooseBtn }
                      moreShopping={ shoppingMore }
                      toBasket={ toBasket }/>
                  </section>
                  <p id="inStock">{ 'Antal i lager: ' + 'ewf ' }</p>               
                </section>
              </td> 
            </tr>
            <br></br>
            <tr><td colSpan="10">Beskrivnning</td></tr>
            <tr><td colSpan="10">{ incommingProduct.description }</td></tr>
            <br></br><br></br>
            <tr>
              <td colSpan="10">
                <section id="setImgControlContainer">
                  <section id="imgContainer">
                    { <img id="productImgGallery" src={'https://cmstenta.devspace.host/' + imgSrc } alt="produkt bild"/> }
                  </section>
                  <section id="setImgContainer">
                    <button onClick={ imgDecrease }>-</button> <p id="sideNr">{ imgCurrentNr + ' / ' +  imgesTot }</p> <button onClick={ imgIncrease }>+</button>            
                  </section>
                </section>
              </td>
            </tr>
          </tbody>
        </table>
       
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