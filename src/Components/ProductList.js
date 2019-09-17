import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { objAxiosUrls } from './Repeaters.js';
import axios from 'axios';
import {BehaviorSubject} from "rxjs";
import { isArray } from 'util';
import { isNumericLiteral } from '@babel/types';

export let ProductList = (props) => {
  let startProductLimit = 5;
  let [ incommingProduct, setincommingProduct ] = useState([]);
  let [ productTotal, setProductTotal ] = useState(0);
  let [ pageNr, setPageNr ] = useState(1);
  let [ changeSkip, setChangeSkip ] = useState(0);
  let [ productLimit, setProductLimit ] = useState(startProductLimit); // Article /Page
  let [ goToBasket, setGoToBasket ] = useState(false);

  let [ searchProducts, setSearchProducts ] = useState(''); // Varför space. annars infogas inte data till tabellen?
  let [ inStock, setInstock ] = useState('');
  let [ shoppingBasketContent, setShoppingBasketContent ] = useState([]);
  
  let pages = 1;
  let productToSkip = 0;

  useEffect(() =>{
    // Get products
    axios.get(`${objAxiosUrls.urlGetProductList}?skip=${changeSkip}&limit=${productLimit}?1filter[name]=${searchProducts}${inStock}`, {
      headers: objAxiosUrls.cockpitToken
    })
    .then(response => {
      //console.log(response);
      setincommingProduct(response.data.entries);
      setProductTotal(response.data.total)
    })
    .catch((error) => {
      //console.log(error);
    });
    let shoppingBasket$ = new BehaviorSubject(window.localStorage.getItem('shoppingBasket'));
    let incommingData = JSON.parse(shoppingBasket$.value);
    
    setShoppingBasketContent(incommingData);
  }, [changeSkip, searchProducts, inStock]);
  
  function productSearch(e) {
    let removeProductLimit = 0;
    setProductLimit(removeProductLimit);
    let targetProduct = e.target.value;
    setSearchProducts(targetProduct);
    if (targetProduct === '') {
      setProductLimit(startProductLimit);
    }
  }
  let filterProducts = incommingProduct.filter((productsListData) => {
    return productsListData.name.includes(searchProducts)
  })
  let productsInStock = (e) => {
    let targetStr = e.target.value;
    
    if (targetStr === 'showProductsInStock') {
      setInstock('&filter[inStock]=${inStock}');
    }
    
    if (targetStr === 'showAllProductsInStock') {
      setInstock('');
    }
  }
  function setPageDecrease() {
    pages = pageNr - 1;
    productToSkip = (pageNr - 1)*productLimit-productLimit; //Calculate page´s

    if (pages < 1) return;
    else{
      setPageNr(pages);
      setChangeSkip(productToSkip);
    } 

  }
  function setPageIncrease() {  // Fel = Sidor överskrider vad som kommer in
    pages = pageNr + 1;
    const pagesTot = Math.ceil(productTotal / productLimit); // Tot pages¨

    productToSkip = (pageNr + 1)*productLimit-productLimit;  //Calculate page´s
    
    if (pageNr >= pagesTot) return;   
    else {
      setPageNr(pages);
      setChangeSkip(productToSkip);
    }
  }
  /*   let calcTotPages = () => {
    let totPages = parseInt(productTotal / productLimit);
    
    return totPages;
  } */
  let runGoToBastet = () => {
    setGoToBasket(true);
  }
  if ( goToBasket === true) return <Redirect to="/ShoppingBasket"/>
  
  return(
    <>
      <section id="inputSearchContainer">
        Sök produkter: <input className="inputWitdhSearch" type="text" onChange={ productSearch }/><br/><br/>
      </section>
      
      <div className="pageProductsList">
        <table id="tableProducts">
          <thead>
            <tr>
              <th className="tableProductsTh1">Nr</th>
              <th className="tableProductsTh2">Produktnamn</th>
              <th>Pris</th>
              <th>På lager</th>
              <th>Bild</th>
            </tr>
          </thead>
          <tbody id="tableProductsBody">
            {(incommingProduct.length === 0)
              ? <tr><td><p id="listGetting">Listan hämtas ...</p></td></tr>              : 
              filterProducts.map((obj, productCount) => {
                productCount += 1;
                
                  return (
                  <tr key={productCount}>
                    <td className="tableProductsTh1">{ productCount }</td>
                    <td className="tableProductsTh2"><Link to={"/ProductDetail/" + obj._id }>{ obj.name }</Link></td>
                    <td>{ obj.price +' kr' }</td>
                    <td>{ obj.inStockQuantity + ' st' }</td>
                  <td className="productHeadImgTd">{ <img className="productHeadImg" src={'https://cmstenta.devspace.host/' + obj.imgesGallery[0].path } alt="produkt bild"/> }</td>
                  </tr>
                  );
                })
                }
          </tbody>
        </table >
      </div>
      <section id="productListFooter">
        <section id="showInStockContainer">
          <button onClick={ productsInStock } className="showInStockAllProduct"  value="showProductsInStock">Alla produkter på lager</button>
          <p id="showInStock1Letter">{ ' / '}</p>
          <button onClick={ productsInStock } className="showInStockRestetProduct" value="showAllProductsInStock">Återställ</button>            
        </section>
        <section id="pageControlContainer">
          
          <section></section>
          <section id="setPageContainer" style={(searchProducts !== '') ? {display: 'none'} : {display: 'block'}}>
            <div id="setPageContainerFlexBox">            
              <button onClick={ setPageDecrease } className="chooseBtn">-</button> <p id="sideNr">{ pageNr }</p> <button onClick={ setPageIncrease } className="chooseBtn">+</button>            
            </div>
          </section>
          
          <section><button id="goToBasket" className="chooseBtn" onClick={ runGoToBastet } style={(shoppingBasketContent === null) ? {opacity: '0'} : {opacity: '1'}}>Varukorgen</button></section>
        </section>
      </section>
    </>
  );
}