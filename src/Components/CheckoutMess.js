import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { log } from 'util';

export let AuthorsAll = (props) => {
  let [authorsList, setAuthorsList ] = useState([]);    
  
  useEffect(() => {
    // Get Author
    axios.get('https://cmslabb1.devspace.host/api/collections/get/Forfattare', {
      headers: { 'Cockpit-Token': '3dcadbb31033dd704673a595544b15}' }
    })
    .then(response => {
      console.log(response.data.entries);
      setAuthorsList(response.data.entries);
    })
    .catch((error) => {
      //console.log(error);
    });
  }, []);
  if (!authorsList) {
    return <p id="listGetting">Listan hämtas ...</p>;
  }
  // Clean the data from comma
  //let cleanAuthor = author.name.split(',')[0];
  console.log(authorsList);
  
  return(      
    <> 
      <p className="headLine">Författare</p>
      <div className="page">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Författare</title>
        </Helmet>
        <table id="articles">
          <thead>
            <tr><th>Namn</th><th>Beskrivning</th><th>Porträtt</th></tr>
          </thead>
          <tbody>
            {
                authorsList.map((obj, authorCount) => {
                    authorCount += 1;
                    console.log(obj);                  
                    // Clean the data from comma
                    //let cleanAuthor = obj.author[0].display.split(',');
                    
                return (
                    <tr>
                        <td>{ obj.name }</td>
                        <td>{ obj.description }</td>
                <td>{ <img className="authorImg" src={'https://cmslabb1.devspace.host/' + obj.avatar.path } alt="Ett porträtt"/> }</td>
                  </tr>
                    );
                })
            }
          </tbody>
        </table>
      </div>
    </>
  );
}