import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';


export let ProductDetail = (props) => {
  let [ incommingArticle, setIncomminArticle ] = useState(null);
  useEffect(() => {
    let articleId = props.match.params.id;

    // Get Articles
    axios.get('https://cmslabb1.devspace.host/api/collections/get/Artiklar?filter[_id]=' + articleId, {
    headers: { 'Cockpit-Token': '6f17f3f1b843b47ae5c16a52c8c83e}' }
  })
    .then(response => {
      //console.log(response.data.entries[0]);
      setIncomminArticle(response.data.entries[0]);
    })
    .catch((error) => {
      //console.log(error);
    });
  }, []);  
 
  if (!incommingArticle) {
    return <p id="listGetting">Listan hämtas ...</p>;
  }

  // Fix the choosen Articles title
  let choosenTitle = incommingArticle.title;
  return(       
    <>
      <p className="headLine">{ 'Författarblogg - ' + choosenTitle }</p>
      <div className="page">
        <Helmet>
          <meta charSet="utf-8" />  
          <title>{ 'Författarblogg' + ' - ' + choosenTitle }</title>
        </Helmet>
        <table id="articles">
          <thead>
            <tr><th>Titel</th><th>Författare</th><th>Datum</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>{ incommingArticle.title }</td>
              <td>{ incommingArticle.author[0].display.split(',') }</td>
              <td>{ incommingArticle.published_on }</td>
            </tr>
            <tr>
              <th colSpan="10">Beskrivnning</th>
            </tr>
            <tr>
                <td colSpan="10">
                  <section id="articlesDes">  
                    <ReactMarkdown>{ incommingArticle.body}</ReactMarkdown>
                  </section>
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}