import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';

export let ProductList = (props) => {
  let [ incommingProduct, setincommingProduct ] = useState([]);
  let [ productTotal, setproductTotal ] = useState(0);
  let [ pageNr, setPageNr ] = useState(1);

  let [changeSkip, setChangeSkip ] = useState(0);
  let [ productLimit ] = useState(5); // Article /Page
  //let [ searchArticle, setSearchArticle ] = useState(' '); // Varför space. annars infogas inte data till tabellen?
  
  let pages = 1;
  let getIntoPage = 0;

  useEffect(() =>{
    // Get products
    axios.get(`https://cmstenta.devspace.host/api/collections/get/products?skip=${changeSkip}&limit=${productLimit}` , {
      headers: { 'Cockpit-Token': '6f17f3f1b843b47ae5c16a52c8c83e' }
    })
    .then(response => {
      console.log(response);
      setincommingProduct(response.data.entries);
      setproductTotal(response.data.total)
    })
    .catch((error) => {
      //console.log(error);
    });
  }, [changeSkip]);
  

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
            <tr><th>Nr</th><th>Produktnamn</th><th>Pris</th><th>Bild</th></tr>
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
          <section id="setPageContainer">
            <button onClick={ setPageDecrease }>-</button> <p id="sideNr">{ pageNr
            // + ' / ' +  calcTotPages() 
          }</p> <button onClick={ setPageIncrease }>+</button>            
          </section>
        </section>
    </>
  );
}