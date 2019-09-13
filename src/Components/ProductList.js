import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { objProductList } from './Repeaters.js';
import axios from 'axios';
import { log } from 'util';

export let ProductList = (props) => {
  let [ incommingProduct, setincommingProduct ] = useState([]);
  let [ productTotal, setProductTotal ] = useState(0);
  let [ pageNr, setPageNr ] = useState(1);
  let [ changeSkip, setChangeSkip ] = useState(0);
  let [ productLimit ] = useState(5); // Article /Page
  let [ goToBasket, setGoToBasket ] = useState(false);

  let [ searchProducts, setSearchProducts ] = useState(' '); // Varför space. annars infogas inte data till tabellen?
  let [ inStock, setInstock ] = useState('');
  let pages = 1;
  let getIntoPage = 0;

  useEffect(() =>{
    // Get products
    axios.get(`${objProductList.urlGetProductList}?skip=${changeSkip}&limit=${productLimit}?1filter[name]=${searchProducts}${inStock}`, {
      headers: objProductList.cockpitToken
    })
    .then(response => {
      console.log(response);
      setincommingProduct(response.data.entries);
      setProductTotal(response.data.total)
    })
    .catch((error) => {
      //console.log(error);
    });
  }, [changeSkip, searchProducts, inStock]);
  console.log(objProductList.cockpitToken);
  console.log(incommingProduct);

 function inputProducts(e) {
    let targetProduct = e.target.value;
    setSearchProducts(targetProduct);
  }
  let filterProducts = incommingProduct.filter((productsListData) => {
     return productsListData.name.includes(searchProducts)
    }
  )
  let productsInStock = (e) => {
    let targetStr = e.target.value;

    if (targetStr === 'showProductsInStock') {
      setInstock('&filter[inStock]=${inStock}');
    }
    
    if (targetStr === 'showAllProductsInStock') {
      setInstock('');
    }
    console.log(targetStr);
    
  }
  function setPageDecrease() {
    pages = pageNr - 1;
    getIntoPage = (pageNr - 1)*productLimit-productLimit; //Calculate page´s
   
    if (pages < 1) return;
    else{
      setPageNr(pages);
      setChangeSkip(getIntoPage);
    } 
  }
  function setPageIncrease() {  // Fel = Sidor överskrider vad som kommer in
    console.log('frs');
    
    pages = pageNr + 1;
    getIntoPage = (pageNr + 1)*productLimit-productLimit;  //Calculate page´s
    // If the length is less than incomming products there are no new page
    if (incommingProduct.length < productLimit) return;   
    else {
      setPageNr(pages);
      setChangeSkip(getIntoPage);
    }
  }
  console.log(incommingProduct.length);
  console.log(productLimit);
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
        Sök produkter: <input className="inputWitdhSearch" type="text" onChange={ inputProducts }/><br/><br/>
      </section>
      
      <div className="pageProductsList">
        <table id="tableProducts">
          <thead>
          <tr><th>Nr</th><th>Produktnamn</th><th>Pris</th><th>På lager </th><th>Bild</th></tr>
          </thead>
          <tbody>
            {(incommingProduct.length === 0)
              ? <p id="listGetting">Listan hämtas ...</p>
              : 
                filterProducts.map((obj, productCount) => {
                  productCount += 1;
                             
                  return (
                  <tr key={productCount}>
                    <td>{ productCount }</td>
                    <td><Link to={"/ProductDetail/" + obj._id }>{ obj.name }</Link></td>
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
        <section id="showInStockContainer">
          <button onClick={ productsInStock } className="showInStockAllProduct"  value="showProductsInStock">Alla produkter på lager</button>
          <p id="showInStock1Letter">{ ' / '}</p>
          <button onClick={ productsInStock } className="showInStockRestetProduct" value="showAllProductsInStock">Återställ</button>            
        </section>
        <section id="pageControlContainer">
          <section></section>
          <section id="setPageContainer">
            <button onClick={ setPageDecrease } className="chooseBtn">-</button> <p id="sideNr">{ pageNr }</p> <button onClick={ setPageIncrease } className="chooseBtn">+</button>            
          </section>
          <button id="goToBasket" className="chooseBtn" onClick={ runGoToBastet }>Varukorgen</button>
        </section>
      </>
  );
}