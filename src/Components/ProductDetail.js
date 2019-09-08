import React, { useState, useEffect } from 'react';
import axios from 'axios';

export let ProductDetail = (props) => {
  let [ incommingProduct, setIncomminngProduct ] = useState(null);
  let productId = props.match.params.id;
  useEffect(() => {

    // Get Articles
    axios.get('https://cmstenta.devspace.host/api/collections/get/products?filter[_id]=' + productId, {
    headers: { 'Cockpit-Token': '6f17f3f1b843b47ae5c16a52c8c83e}' }
  })
    .then(response => {
      console.log(response.data.entries[0]);
      setIncomminngProduct(response.data.entries[0]);
    })
    .catch((error) => {
      //console.log(error);
    });
  }, []);  
 
  if (!incommingProduct) {
    return <p id="listGetting">Listan hämtas ...</p>;
  }

  console.log(productId);
  
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
              <td>{ incommingProduct.name }</td>
              <td>{ incommingProduct.price + ' kr' }</td>
              <td>
                <section id="buyProduktContainer">
                  <section id="buyProdukt">
                    <p id="">Köp:</p><input id="buyProduktInput" type="number"/>
                    <button id="addBasteBtn">Lägg i Varukorgen</button>
                  </section>
                  <p id="inStock">{ 'Antal i lager: ' + 'ewf ' }</p>               
                </section>
              </td> 
            </tr>
            <tr><td colSpan="10">Beskrivnning</td></tr>
            <tr><td colSpan="10">{'Beskrivnning'}</td></tr>
            <tr><th>Bilder</th></tr>
            <tr>
              <td colSpan="10">
                few
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}