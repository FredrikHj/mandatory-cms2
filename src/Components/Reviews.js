import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { objProductList } from './Repeaters.js';
import axios from 'axios';

export let Reviews = (props) => {
    let [ incommingReviews, setIncommingReviews ] = useState([]);
    let [ reviewName, setReviewName ] = useState('');
    let [ reviewMess, setReviewMess ] = useState('');
    let [ reviewRating, setReviewRating ] = useState('');

    useEffect(() => {
        // Get Review
         axios.get(`${objProductList.urlReviews}`//?=${props.productId}`
         , {
          headers: objProductList.cockpitToken
        })
        .then(response => {
            let incommingData = response;
            console.log(incommingData);
            //setIncommingReviews(incommingData);                          
        })
        .catch((error) => {
          console.log(error);
        });
      }, []);
        
    if (!incommingReviews) {
        return <p id="listGetting">Listan hämtas ...</p>;
    }
    let addReview = () => {
        // Make a object for sending into Cockpit
        let cockpitObj = {
            title: reviewName,
            body: reviewMess,
            rating: reviewRating,
        };
        // Post a new review
        axios.post(`${objProductList.urlReviews}` //?=${props.productId}`
        ,{
            headers: [ objProductList.cockpitToken, {"Content-Type": "application/json"} ],
            body: JSON.stringify(cockpitObj),
        })
        .then(response => {
            let incommingData = response;
            console.log(incommingData);
            //setIncommingReviews(incommingData);                          
            console.log(response);
            // 
        })
        .catch((error) => {
            console.log(error);
        });
    };
    let handleReviewName = (e) => {
        let targetStr = e.target.value;
        setReviewName(targetStr);
    }
    let handleReviewMess = (e) => {
        let targetStr = e.target.value;
        setReviewMess(targetStr);
    }
    let handleReviewRating = (e) => {
        let targetStr = e.target.value;
        setReviewRating(targetStr);
    }
    console.log(reviewName);
    console.log(reviewMess);
    console.log(reviewRating);
    return (
        <section id="reviewContainer" style={(props.showProductReview === true) ? {display: 'block'} : {display: 'none'}} >
            <p className="headLineRewview">{'Recensioner för - ' + props.productName }  </p>
            <table id="tableReview">
                <thead>
                    <tr><th>Namn</th><th>Recension</th><th>Betyg</th></tr>
                </thead>
                <tbody>
                    {(incommingReviews.length === 0)
                        ? (props.productReviewShow !== 'Antal recensioner')
                            ?
                                <tr>
                                    <td><input id="reviewInputName" type="text" onChange={ handleReviewName }/></td>   
                                    <td><textarea id="reviewInputMess" type="text" onChange={ handleReviewMess }/></td>
                                    <td><input id="reviewInputRating" type="number" onChange={ handleReviewName }/></td>   
                            </tr> 
 
                        
                            :
                                incommingReviews.map((obj, productCount) => {
                                    productCount += 1;
                                                    
                                    return (
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    );
                                })
                            
                        : <p id="listGetting">Inga recensioner ...</p> 
                        }
                    </tbody>
                </table >
  
                <section id="reviewBtn">
                    <button onClick={ '' } className="chooseBtn" id="addReview">Rensa</button>
                    <button onClick={ addReview } className="chooseBtn" id="addReview">Posta</button>
               </section>

        </section>
    );
};

