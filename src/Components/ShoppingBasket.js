import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

export let ShoppingBasket = (props) => {
  let [author, setAuthor ] = useState(null);    
  
  useEffect(() => {
    let authorId = props.match.params.id;
    // Get Author
    axios.get('https://cmslabb1.devspace.host/api/collections/get/Forfattare?filter[_id]=' + authorId, {
      headers: { 'Cockpit-Token': '6f17f3f1b843b47ae5c16a52c8c83e}' }
    })
    .then(response => {
      //console.log(response.data.entries[0]);
      setAuthor(response.data.entries[0])
    })
    .catch((error) => {
      //console.log(error);
    });
  }, []);
  if (!author) {
    return <p id="listGetting">Listan hämtas ...</p>;
  }
  // Clean the data from comma
  let cleanAuthor = author.name.split(',')[0];
  return(      
    <> 
      <p className="headLine">{ 'Författarblogg - ' + cleanAuthor}</p>
      <div className="page">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{ 'Författarblogg' + ' - ' + cleanAuthor }</title>
        </Helmet>
        <table id="articles">
          <thead>
            <tr><th>Namn</th><th>Beskrivning</th><th>Porträtt</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>{ cleanAuthor }</td>
              <td>{ author.description }</td>
              <td><img className="authorImg" src={'https://cmslabb1.devspace.host/' + author.avatar.path } alt="Ett porträtt"/></td>
            </tr>
          </tbody>
        </table>
        <section id="authorsAll">
          <Link to={"/AuthorsAll" }> Alla Författare!</Link>
        </section>
      </div>
    </>
  );
}