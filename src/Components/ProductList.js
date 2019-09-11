import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { objProductList } from './Repeaters.js';
import axios from 'axios';

export let ProductList = (props) => {
  let [ incommingProduct, setincommingProduct ] = useState([]);
  let [ productTotal, setProductTotal ] = useState(0);
  let [ pageNr, setPageNr ] = useState(1);

  let [ changeSkip, setChangeSkip ] = useState(0);
  let [ productLimit ] = useState(5); // Article /Page
  let [ goToBasket, setGoToBasket ] = useState(false);

  //let [ searchArticle, setSearchArticle ] = useState(' '); // Varför space. annars infogas inte data till tabellen?
  
  let pages = 1;
  let getIntoPage = 0;

  useEffect(() =>{
    // Get products
    axios.get(`${objProductList.urlProductList}?skip=${changeSkip}&limit=${productLimit}`, {
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
  }, [changeSkip]);
  console.log(objProductList.cockpitToken);
  console.log(incommingProduct);

 /*  function inputSearchArticle(e) {
    let targetArticle = e.target.value;
    setSearchArticle(targetArticle);
  }
  let filterArticle = incommingProduct.filter((articleListData) => {
     return articleListData.title.includes(searchArticle)
    }
  ) */
  function setPageDecrease() {
    pages = pageNr - 1;
    getIntoPage = (pageNr - 1)*productLimit-productLimit; //Calculate page´s
   
    if (pages < 1) return;
    else{
      setPageNr(pages);
      setChangeSkip(getIntoPage);
    } 
  }
  function setPageIncrease() {
    console.log('frs');
    
    pages = pageNr + 1;
    getIntoPage = (pageNr + 1)*productLimit-productLimit;  //Calculate page´s
    if (productTotal < incommingProduct.length+1) return;
    else {
      setPageNr(pages);
      setChangeSkip(getIntoPage);
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
        Sök produkter: <input className="inputWitdhSearch" type="text" 
        //onChange={ inputSearchArticle }
        /><br/><br/>
      </section>
      
      <div className="pageProductsList">
        {(incommingProduct.length === 0)
          ? <p id="listGetting">Listan hämtas ...</p>
          : <table id="products">
            <thead>
            <tr><th>Nr</th><th>Produktnamn</th><th>Pris</th><th>På lager</th><th>Bild</th></tr>
            </thead>
            <tbody>
              {
                incommingProduct.map((obj, productCount) => {
                  productCount += 1;
                                 
                return (
                  <tr key={productCount}>
                    <td>{ productCount }</td>
                    <td><Link to={"/ProductDetail/" + obj._id }>{ obj.name }</Link></td>
                    <td>{ obj.price +' kr' }</td>
                    <td>{ obj.stock + ' st' }</td>
                    <td className="productHeadImgTd">{ <img className="productHeadImg" src={'https://cmstenta.devspace.host/' + obj.imgesGallery[0].path } alt="produkt bild"/>}</td>
                  </tr>
                  );
                })
              }
            </tbody>
          </table >
        }
      </div>
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